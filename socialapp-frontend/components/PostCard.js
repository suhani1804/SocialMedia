// components/PostCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PostCard({ post }) {
  return (
    <View style={styles.card}>
      <Text style={styles.author}>{post.author.username}</Text>
      <Text>{post.content}</Text>
      <Text style={styles.date}>{new Date(post.createdAt).toLocaleString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, backgroundColor: '#f9f9f9', marginBottom: 15, borderRadius: 5 },
  author: { fontWeight: 'bold' },
  date: { fontSize: 12, color: '#666', marginTop: 5 },
});
