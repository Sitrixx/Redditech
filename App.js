import React from 'react';
import Connexion from './Components/Connexion';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Subreddits from './Components/Subreddits';
import Search from './Components/Search';
import Settings from './Components/Settings';
import SplashScreen from './Components/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

// const AppNavigator = createStackNavigator(
//   {
//     SplashToMenu: SplashToMenu,
//     Connexion: Connexion,
//     Home: Home,
//   },
//   {
//     defaultNavigationOptions: {
//         headerShown: false
//     },
//   }
// );

// const Navigator = createAppContainer(AppNavigator);
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="Connexion" component={Connexion}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Search" component={Search}/>
        <Stack.Screen name="Settings" component={Settings}/>
        <Stack.Screen name="Subreddits" component={Subreddits}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
