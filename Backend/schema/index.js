const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema, GraphQLID, GraphQLNonNull, GraphQLInt } = require('graphql');
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// Types
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    bio: { type: GraphQLString },
  },
});

// Post Type
const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLID },
    content: { type: GraphQLString },
    image: { type: GraphQLString },
    likes: { type: GraphQLInt },
    author: { type: UserType },
    createdAt: { type: GraphQLString },
    comments: {
      type: new GraphQLList(GraphQLString), // Simplified for now
    },
  },
});

// Queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getPosts: {
      type: new GraphQLList(PostType),
      args: { keyword: { type: GraphQLString }, author: { type: GraphQLString } },
      async resolve(_, { keyword, author }) {
        const filter = {};
        if (keyword) filter.content = { $regex: keyword, $options: 'i' };
        if (author) {
          const user = await User.findOne({ username: author });
          if (user) filter.author = user.id;
        }
        return await Post.find(filter).populate('author');
      },
    },
    getPostById: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(_, { id }) {
        return Post.findById(id).populate('author');
      },
    },
    getUserProfile: {
      type: new GraphQLObjectType({
        name: 'UserProfile',
        fields: {
          username: { type: GraphQLString },
          bio: { type: GraphQLString },
          posts: { type: new GraphQLList(PostType) },
        },
      }),
      args: { userId: { type: GraphQLID } },
      async resolve(_, { userId }) {
        const user = await User.findById(userId);
        const posts = await Post.find({ author: userId });
        return { username: user.username, bio: user.bio, posts };
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    register: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { username, email, password }) {
        const user = new User({ username, email, password });
        await user.save();
        return user;
      },
    },
    login: {
      type: GraphQLString, // Returns JWT token
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(_, { email, password }) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
    
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Invalid password');
    
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      },
    },
    
    createPost: {
      type: PostType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        // image: { type: GraphQLString }, // Image URL
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_, { content, image, authorId }) {
        const post = new Post({ content, image, author: authorId });
        await post.save();
        return post;
      },
    },
    addComment: {
      type: GraphQLString,
      args: {
        postId: { type: GraphQLID },
        text: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      async resolve(_, { postId, text, authorId }) {
        const comment = new Comment({ text, post: postId, author: authorId });
        await comment.save();
        const post = await Post.findById(postId);
        post.comments.push(comment.id);
        await post.save();
        return 'Comment added!';
      },
    },
    likePost: {
      type: PostType,
      args: { postId: { type: GraphQLID } },
      async resolve(_, { postId }) {
        const post = await Post.findById(postId);
        post.likes++;
        await post.save();
        return post;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
