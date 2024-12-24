// PostPage.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList } from 'react-native';

// Dummy user names for comments
const userNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

const PostPage = ({ route, navigation }) => {
  const { post } = route.params;
  const [comment, setComment] = useState('');

  const getRandomUsername = () => {
    const randomIndex = Math.floor(Math.random() * userNames.length);
    return userNames[randomIndex];
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: (post.comments.length + 1).toString(),
        username: getRandomUsername(),
        text: comment,
      };

      const updatedPost = {
        ...post,
        comments: [...post.comments, newComment],
      };

      navigation.setParams({ post: updatedPost });
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.username}>{post.author.username}</Text>
          <Text style={styles.time}>{new Date(post.createdAt).toLocaleString()}</Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentUser}>{item.username}:</Text>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
      />

      <TextInput
        placeholder="Write a comment..."
        style={styles.input}
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Send" onPress={handleAddComment} color="#8560c7" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  headerText: {
    flexDirection: 'column',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  content: {
    fontSize: 20,
    color: '#333',
    marginBottom: 20,
  },
  comment: {
    marginBottom: 15,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#8560c7',
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});

export default PostPage;
