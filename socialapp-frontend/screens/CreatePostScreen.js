// CreatePost.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const CreatePost = ({ navigation }) => {
  const [newPostContent, setNewPostContent] = useState('');

  const handleCreatePost = () => {
    if (newPostContent.trim()) {
      const newPost = {
        id: new Date().toISOString(),
        content: newPostContent,
        image: '', // Default image URL if needed
        likes: 0,
        likedByUser: false,
        comments: [],
        author: { username: 'Suhani', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
        createdAt: new Date().toISOString(),
      };

      // Navigate to the PostPage with the new post data
      navigation.navigate('PostPage', { post: newPost });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Post</Text>
      <TextInput
        placeholder="What's on your mind?"
        style={styles.input}
        value={newPostContent}
        onChangeText={setNewPostContent}
      />
      <Button title="Create Post" onPress={handleCreatePost} color="#8560c7" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
});

export default CreatePost;
