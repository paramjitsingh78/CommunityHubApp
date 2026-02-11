import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommunityListScreen} from '@app/screens/communities/CommunityListScreen';
import {CommunityDetailsScreen} from '@app/screens/communities/CommunityDetailsScreen';
import {CommunityStackParamList} from './types';

const Stack = createNativeStackNavigator<CommunityStackParamList>();

export const CommunityStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CommunityList"
        component={CommunityListScreen}
        options={{title: 'Communities'}}
      />
      <Stack.Screen
        name="CommunityDetails"
        component={CommunityDetailsScreen}
        options={{title: 'Community Details'}}
      />
    </Stack.Navigator>
  );
};
