import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommunityListScreen} from '@app/screens/communities/CommunityListScreen';
import {CommunityDetailsScreen} from '@app/screens/communities/CommunityDetailsScreen';
import {
  CommunityStackParamList,
  DiscoverStackParamList,
  ProfileStackParamList,
} from './types';
import {MapScreen} from '@app/screens/map/MapScreen';
import {ProfileScreen} from '@app/screens/profile/ProfileScreen';
import {sharedHeaderOptions} from './options';

const Stack = createNativeStackNavigator<CommunityStackParamList>();

export const CommunityStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={sharedHeaderOptions}>
      <Stack.Screen name="CommunityList" component={CommunityListScreen} />
      <Stack.Screen
        name="CommunityDetails"
        component={CommunityDetailsScreen}
        options={{
          title: 'Community Details',
          headerBackTitle: 'Communities',
        }}
      />
    </Stack.Navigator>
  );
};
const DStack = createNativeStackNavigator<DiscoverStackParamList>();
export const DiscoverStack = () => (
  <DStack.Navigator screenOptions={sharedHeaderOptions}>
    <DStack.Screen
      name="Discover"
      component={MapScreen}
      options={{title: 'Community Map'}}
    />
  </DStack.Navigator>
);

const PStack = createNativeStackNavigator<ProfileStackParamList>();
export const ProfileStack = () => (
  <PStack.Navigator screenOptions={sharedHeaderOptions}>
    <PStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{title: 'Profile'}}
    />
  </PStack.Navigator>
);
