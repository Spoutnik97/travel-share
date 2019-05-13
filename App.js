import React from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Setting a timer']);

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

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
import ShareWithProfilScreen from './screens/ShareWithProfil';

import AirportsMapScreen from './screens/AirportsMap';
import AirportsServicesScreen from './screens/AirportsServices';
import AirportsTipsScreen from './screens/AirportsTips';

import ConversationScreen from './screens/Conversation';
import ContactsScreen from './screens/Contacts';

import ProfilScreen from './screens/Profil';
import EditProfilScreen from './screens/EditProfil';
import FavoritesScreen from './screens/Favorites';
import AdvicedScreen from './screens/Adviced';

import ServiceDetailsScreen from './screens/ServiceDetails';

import colors from './styles/colors';
import styles from './styles/styles';

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
    headerMode: 'none',
  }
);

const ExplorerStackNavigator = createStackNavigator(
  {
    explorerHome: { screen: ExplorerScreen },
    shareWith: { screen: ShareWithScreen },
    shareWithProfil: { screen: ShareWithProfilScreen },
    newConversation: { screen: ConversationScreen },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
        height: styles.HEADER_HEIGHT,
      },
      // headerTitleStyle: { paddingBottom: 20 },
      headerTintColor: '#fff',
    },
  }
);

const ProfilStackNavigator = createStackNavigator(
  {
    profil: { screen: ProfilScreen },
    editProfil: { screen: EditProfilScreen },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
        height: styles.HEADER_HEIGHT,
      },
      headerTintColor: '#fff',
    },
  }
);

const MessagesStackNavigator = createStackNavigator(
  {
    contacts: { screen: ContactsScreen },
    conversation: { screen: ConversationScreen },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.primary,
        height: styles.HEADER_HEIGHT,
      },
      headerTintColor: '#fff',
    },
  }
);

const TipsTabNavigator = createMaterialTopTabNavigator(
  {
    myFavorites: { screen: FavoritesScreen },
    adviced: { screen: AdvicedScreen },
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

const FavoritesStackNavigator = createStackNavigator({
  favoritesHome: {
    screen: TipsTabNavigator,
    navigationOptions: { headerTransparent: true },
  },
  serviceDetails: { screen: ServiceDetailsScreen },
});

const AirportsTabNavigator = createMaterialTopTabNavigator(
  {
    Map: { screen: AirportsMapScreen },
    Services: { screen: AirportsServicesScreen },
    AirportsTips: { screen: AirportsTipsScreen },
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
      screen: MessagesStackNavigator,
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
    // Favorites: {
    //   screen: FavoritesStackNavigator,
    //   navigationOptions: {
    //     title: 'Bons plans',
    //     tabBarIcon: ({ focused }) => (
    //       <Icon
    //         name="favorite-border"
    //         size={24}
    //         color={focused ? colors.primary : colors.grey_dark}
    //       />
    //     ),
    //   },
    // },
    Profil: {
      screen: ProfilStackNavigator,
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
    order: ['Profil', 'Airports', 'Messages', 'Explorer'],
    // order: ['Profil', 'Favorites', 'Airports', 'Messages', 'Explorer'],
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
