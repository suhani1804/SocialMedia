// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client'; 

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import FeedScreen from './screens/FeedScreen';
import CreatePostScreen from './screens/CreatePostScreen';
import ProfileScreen from './screens/ProfileScreen';
import NotificationTab from './screens/NotificationTab';
import PostDetailScreen from './screens/PostDetailScreen';
import PostPage from './screens/PostPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Feed') iconName = 'home';
          else if (route.name === 'Profile') iconName = 'account';
          else if (route.name === 'Notifications') iconName = 'bell';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Notifications" component={NotificationTab} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="FeedScreen" component={FeedScreen} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="PostDetail" component={PostDetailScreen} />
          <Stack.Screen name="PostPage" component={PostPage} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </ApolloProvider>
  );
}
