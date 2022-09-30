import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash_screen from './screens/auth_screens/splash_screen';
import Login_screen from './screens/auth_screens/login_screen';
import Signup_screen from './screens/auth_screens/signup_screen';
import Home_screen from './screens/Home/home_screen';
import LabResults from './screens/lab/lab_results';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notifications from './screens/notifications';
import Settings from './screens/settings';
import { colors } from './common/colors';
import ResultScreen from './screens/lab/result_screen';
import ProfileScreen from './screens/profile_screens/profile_screens';
import InitialProfile from './screens/profile_screens/initial_profile_info';
import WellnessSpace from './screens/wellness-space/wellness_space';
import TestingKits from './screens/packages-result/packages_list';
import CartScreen from './screens/cart/cart_screen';
import { Icon } from 'react-native-elements';
import ResultCard from './components/ResultCard';



// ************ splash, login, signup screens navigation ************

const AuthStack = createNativeStackNavigator();


const Auth = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='splash' component={Splash_screen} options={{
        header: () => null
      }} />
      <AuthStack.Screen name='login' component={Login_screen} options={{
        header: () => null
      }} />
      <AuthStack.Screen name='signup' component={Signup_screen} options={{
        header: () => null
      }} />
      <AuthStack.Screen name='initial-profile' component={InitialProfile} options={{
        headerTintColor: colors.main_color,
      }} />
    </AuthStack.Navigator>
  )
}


// ************ home, sections inside home navigation ************

const HomeStack = createNativeStackNavigator();

const Home = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='home' component={Home_screen} options={{
        header: () => null,
      }} />
      <HomeStack.Screen name='lab_results' component={LabResults} options={{
        header: () => null,
      }}
      />
      <HomeStack.Screen name='result' component={ResultScreen}
        options={({ route }) => ({
          header: () => null
        })} />

      <HomeStack.Screen name='WellnessSpace' component={WellnessSpace}
        options={({ route }) => ({
          header: () => null
        })} />
      <HomeStack.Screen name='TestingKits' component={TestingKits}
        options={({ route }) => ({
          header: () => null
        })} />
    </HomeStack.Navigator >
  )
}

// ************ screens inside settings screen ************

const SettingsStack = createNativeStackNavigator();

const SettingsMenu = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name='settings' component={Settings} options={
        {
          header: () => null,
        }
      } />
      <SettingsStack.Screen name='profile' component={ProfileScreen} options={{
        headerTintColor: colors.main_color,
      }} />
    </SettingsStack.Navigator>
  )
}


// ************ bottom (home, notifications, settings) navigation ************

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNav = () => {



  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        "tabBarHideOnKeyboard": true,
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'dashboard'
          } else if (route.name === 'SettingsMenu') {
            iconName = 'settings';
          } else if (route.name === 'Notifications') {
            iconName = 'notifications';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-basket';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.main_color,
        tabBarInactiveTintColor: colors.secondary_color,
        tabBarShowLabel: false,
        header: () => null
      })}
    >
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Notifications" component={Notifications} options={{ tabBarBadge: 3, tabBarBadgeStyle: { backgroundColor: 'red', color: '#fff' } }} />
      <BottomTab.Screen name="Cart" component={CartScreen} options={{
        tabBarBadgeStyle: {
          backgroundColor: 'red',
          color: '#fff'
        },
      }} />
      <BottomTab.Screen name="SettingsMenu" component={SettingsMenu} />
    </BottomTab.Navigator>
  )
}


const AppRoutes = (params) => {

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Main" component={BottomNav} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes;