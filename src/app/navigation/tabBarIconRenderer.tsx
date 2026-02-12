import React from 'react';
import {TabBarIcon} from './TabBarIcon';

type Params = {
  routeName: string;
  focused: boolean;
  color: string;
};

export const renderTabBarIcon = ({routeName, focused, color}: Params) => {
  return <TabBarIcon routeName={routeName} focused={focused} color={color} />;
};
