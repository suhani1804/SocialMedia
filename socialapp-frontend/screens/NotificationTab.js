import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { notifications } from '../data/notifications';

export default function NotificationsTab() {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>{item.message}</Text>
            </Card.Content>
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
});
