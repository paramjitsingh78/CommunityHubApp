import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommunityStackNavigator} from './CommunityStackNavigator';

type MainTabParamList = {
  Communities: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Communities"
        component={CommunityStackNavigator}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
