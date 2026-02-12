import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  CommunityStackNavigator,
  DiscoverStack,
  ProfileStack,
} from './CommunityStackNavigator';
import {renderTabBarIcon} from './tabBarIconRenderer';

type MainTabParamList = {
  CommunitiesStack: undefined;
  DiscoverStack: undefined;
  ProfileStack: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: '#9e9e9e',

        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 2,
        },

        tabBarIconStyle: {
          marginTop: 4,
        },

        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 6,
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#eee',
        },

        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },

        tabBarIcon: props =>
          renderTabBarIcon({
            routeName: route.name,
            focused: props.focused,
            color: props.color,
          }),
      })}>
      <Tab.Screen
        name="CommunitiesStack"
        component={CommunityStackNavigator}
        options={{title: 'Communities'}}
      />

      <Tab.Screen
        name="DiscoverStack"
        component={DiscoverStack}
        options={{title: 'Discover'}}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};
