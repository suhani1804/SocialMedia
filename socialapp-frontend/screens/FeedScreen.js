import React, { useState } from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import { Card, Avatar, Button, Text } from "react-native-paper";
import { posts as dummyPosts } from "../data/posts";
import { notifications } from "../data/notifications";

export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState(dummyPosts);

  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
              likedByUser: !post.likedByUser,
            }
          : post
      )
    );

    const likedPost = posts.find((post) => post.id === postId);
    const action = likedPost.likedByUser ? "unliked" : "liked";
    notifications.push({
      id: `${new Date().getTime()}`,
      message: `${likedPost.author.username}'s post was ${action}.`,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.author.username}
              subtitle={`Likes: ${item.likes}`}
              left={(props) => <Avatar.Image {...props} source={{ uri: item.author.avatar }} />}
            />
            
            <Card.Content>
              <Text>{item.content}</Text>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
            </Card.Content>
            <Card.Actions>
              <Button
                icon={item.likedByUser ? "heart" : "heart-outline"}
                color={item.likedByUser ? "red" : "gray"}
                onPress={() => handleLike(item.id)}
              >
                {item.likedByUser ? "Unlike" : "Like"}
              </Button>
              <Button icon="comment" onPress={() => navigation.navigate('PostDetail', { post: item })}>
                            {item.comments.length} Comments
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});