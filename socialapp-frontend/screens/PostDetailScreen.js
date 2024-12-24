import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Card, Avatar, Text, TextInput , Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';


export default function PostDetailScreen({ route, navigation }) {
  const { post } = route.params;
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: (post.comments.length + 1).toString(), // Generate a unique ID
        username: 'Suhani',
        text: comment,
      };

      const updatedPost = {
        ...post,
        comments: [...post.comments, newComment],
      };

      // Update the post with the new comment
      navigation.setParams({ post: updatedPost });
      setComment('');
    }
  };

  return (
    <View style={styles.container}>
      <Icon
          name="arrow-back"
          size={24}
          onPress={() => navigation.navigate('Main')}
          style={styles.backButton}
        />

      <Card>
        <Card.Title
          title={post.author.username}
          subtitle={new Date(post.createdAt).toLocaleString()}
          left={(props) => <Avatar.Image {...props} source={{ uri: post.author.avatar }} />}
        />
        <Card.Content>
          <Text>{post.content}</Text>
          {post.image && <Image source={{ uri: post.image }} style={styles.image} />}
        </Card.Content>
      </Card>
      <Text style={styles.commentTitle}>Comments</Text>
      <FlatList
        data={post.comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Avatar.Text size={24} label={item.username[0]} />
            <Text style={styles.commentText}>
              <Text style={styles.username}>{item.username}:</Text> {item.text}
            </Text>
          </View>
        )}
      />
      <TextInput
        placeholder="Write a comment..."
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20 }}
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Send" onPress={handleAddComment} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  commentTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  commentText: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  backButton: {
    marginRight: 10,
  },
});
