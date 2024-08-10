import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home Page',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add_image"
        options={{
          title: 'Add Image',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name={focused ? "camera" : "camerao"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="medicine_list"
        options={{
          title: 'Medicine List',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name={focused ? "pills" : "pills"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera" 
        options={{
          title: "Camera",
          tabBarButton: () => null, 
        }}
      />
      <Tabs.Screen
        name="_myscrollview" 
        options={{
          title: "myscrollview",
          tabBarButton: () => null, 
        }}
      />
    </Tabs>
  );
}
