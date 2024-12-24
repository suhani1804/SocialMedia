import React from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { Avatar, Card, Text, Button, FAB } from "react-native-paper";
import { posts } from "../data/posts";
import avatar from "../assets/profile.jpg";

export default function ProfileScreen({ navigation }) {
  const userPosts = posts.filter((post) => post.author.username === "Suhani");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image size={100} source={avatar} />
        <Text style={styles.username}>Suhani</Text>
        <Text style={styles.bio}>Welcome to my profile</Text>
      </View>
      <Text style={styles.sectionTitle}>My Posts</Text>
      <FlatList
        data={userPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>{item.content}</Text>
              {item.image && (
                <Image source={{ uri: item.image }} style={styles.image} />
              )}
            </Card.Content>
            <Card.Actions>
              <Button icon="thumb-up">{item.likes} Likes</Button>
              <Button icon="comment">{item.comments.length} Comments</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        label="Create Post"
        onPress={() => navigation.navigate("CreatePost")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  bio: {
    fontStyle: "italic",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#8560c7",
  },
});
