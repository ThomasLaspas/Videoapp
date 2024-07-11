import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

import { icons } from '@/constants';
export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#DC2626",
        headerShown: false,
        tabBarShowLabel: false

      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} name='Home' icon={icons.home} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} name='Create' icon={icons.plus} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon focused={focused} name='Profile' icon={icons.profile} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
