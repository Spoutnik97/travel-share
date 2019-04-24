import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Icon } from 'react-native-elements';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import AuthLoadingScreen from './screens/AuthLoading';

import SignUpScreen from './screens/SignUp';
import SignInScreen from './screens/SignIn';

import ExplorerScreen from './screens/Explorer';
import ShareWithScreen from './screens/ShareWith';
import AirportsMapScreen from './screens/AirportsMap';
import AirportsServicesScreen from './screens/AirportsServices';
import AirportsTipsScreen from './screens/AirportsTips';
import MessagesScreen from './screens/Messages';
import ProfilScreen from './screens/Profil';
import TipsScreen from './screens/Tips';

import colors from './styles/colors';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: '#f1c40f',
  },
};

const AuthStackNavigator = createStackNavigator(
  {
    SignIn: { screen: SignInScreen },
    SignUp: { screen: SignUpScreen },
  },
  {
    initialRouteName: 'SignIn',
  }
);

const ExplorerStackNavigator = createStackNavigator({
  ExplorerHome: { screen: ExplorerScreen },
  ShareWith: { screen: ShareWithScreen },
});

const AirportsTabNavigator = createMaterialTopTabNavigator(
  {
    Map: { screen: AirportsMapScreen },
    Services: { screen: AirportsServicesScreen },
    Tips: { screen: AirportsTipsScreen },
  },
  {
    swipeEnabled: true,
    tapBarOptions: {
      activeTintColor: colors.white,
      inactiveColor: colors.grey_dark,
      pressColor: colors.primary,
    },
  }
);

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Explorer: {
      screen: ExplorerStackNavigator,
      navigationOptions: {
        title: 'Explorer',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="search"
            size={24}
            color={focused ? colors.primary : colors.grey_dark}
          />
        ),
      },
    },
    Messages: {
      screen: MessagesScreen,
      navigationOptions: {
        title: 'Messages',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="message"
            size={24}
            color={focused ? colors.primary : colors.grey_dark}
          />
        ),
      },
    },
    Airports: {
      screen: AirportsTabNavigator,
      navigationOptions: {
        title: 'Aéroports',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="airplanemode-active"
            size={24}
            color={focused ? colors.primary : colors.grey_dark}
          />
        ),
      },
    },
    Tips: {
      screen: TipsScreen,
      navigationOptions: {
        title: 'Bons plans',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="favorite-border"
            size={24}
            color={focused ? colors.primary : colors.grey_dark}
          />
        ),
      },
    },
    Profil: {
      screen: ProfilScreen,
      navigationOptions: {
        title: 'Profil',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="person"
            color={focused ? colors.primary : colors.grey_dark}
            size={24}
          />
        ),
      },
    },
  },
  {
    labeled: true,
    initialRouteName: 'Explorer',
    order: ['Profil', 'Tips', 'Airports', 'Messages', 'Explorer'],
    activeColor: colors.primary,
    inactiveColor: colors.grey_dark,
    barStyle: { backgroundColor: colors.grey_light },
  }
);

const AuthNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabNavigator,
    Auth: AuthStackNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const Navigator = createAppContainer(AuthNavigator);

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Navigator />
      </PaperProvider>
    );
  }
}
