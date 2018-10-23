// import React from 'react';
import { createSwitchNavigator, StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  Main: MainTabNavigator,
});
