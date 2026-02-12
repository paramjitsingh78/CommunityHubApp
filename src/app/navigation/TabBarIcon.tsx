import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  routeName: string;
  focused: boolean;
  color: string;
  size?: number;
};

export const TabBarIcon = ({routeName, focused, color, size = 22}: Props) => {
  let iconName: string;

  switch (routeName) {
    case 'CommunitiesStack':
      iconName = focused ? 'people' : 'people-outline';
      break;

    case 'DiscoverStack':
      iconName = focused ? 'compass' : 'compass-outline';
      break;

    case 'ProfileStack':
      iconName = focused ? 'person' : 'person-outline';
      break;

    default:
      iconName = 'ellipse';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};
