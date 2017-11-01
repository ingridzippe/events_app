// import React from 'react';
import { StackNavigator } from 'react-navigation';
import BottomBarNav from './components/BottomBarNav';
// import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
// import MessagesScreen from './screens/MessagesScreen';
import RegisterScreen from './screens/RegisterScreen';
// import SaveScreen from './screens/SaveScreen';
// import UsersScreen from './screens/UsersScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import MyProfileScreen from './screens/MyProfileScreen';

// const domain = "https://something-horizons.herokuapp.com";
//const domain = "https://hohoho-backend.herokuapp.com"; // Old Server

// here some changes
//Navigator
export default StackNavigator({
  BottomBarNav: {
    screen: BottomBarNav,
    navigationOptions: {
      title: 'BottomBar',
    },
  },
  // Home: {
  //   screen: HomeScreen,
  // },
  Register: {
    screen: RegisterScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  // Users: {
  //   screen: UsersScreen,
  // },
  // Messages: {
  //   screen: MessagesScreen,
  // },
  // Save: {
  //   screen: SaveScreen,
  // },
  Create: {
    screen: CreateEventScreen,
  },
  MyProfile: {
    screen: MyProfileScreen,
  },
}, {
  initialRouteName: 'Create',
  headerMode: 'screen'
});
