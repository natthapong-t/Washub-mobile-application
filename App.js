import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, CardStyleInterpolators } from '@react-navigation/native-stack';

import { AppLoading } from 'expo';

import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import HomeScreen from './screens/Home'
import MainMenuScreen from './screens/MainMenu'
import OTPScreen from './screens/otp'
import OtherScreen from './insideMainMenu/Other'
import MyAddressScreen from './insideMainMenu/insideOther/MyAddress'
import MyProfileScreen from './insideMainMenu/insideOther/MyProfile'
import FavoriteScreen from './screens/Favorite'
import SelectedBranchScreen from './insideMainMenu/insideHomeMainMenu/SelectedBranch'




import * as FirebaseCore from 'expo-firebase-core';

import { useFonts } from 'expo-font';

import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3blSgbugfyarU7AScDbLnFhUQwFUZ7yc",
  authDomain: "washub-react.firebaseapp.com",
  databaseURL: "https://washub-react-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "washub-react",
  storageBucket: "washub-react.appspot.com",
  messagingSenderId: "487165276079",
  appId: "1:487165276079:web:f155dc2e7a48245217895a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);



const MyStack = () => {

  let [fontsLoaded] = useFonts({
    'Prompt-Light': require('./assets/fonts/Prompt-Light.ttf'),
    'Prompt-Regular': require('./assets/fonts/Prompt-Regular.ttf'),
    'Prompt-Bold': require('./assets/fonts/Prompt-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Return a loading indicator or an empty view
  }



  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={
            { title: 'hidden welcome', headerShown: false }
          }
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#C3E3FE'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {

            }

          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#C3E3FE'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {

            }

          }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenuScreen}
          options={{
            headerShown: false,
            title: 'MainMenu',
            headerStyle: {
              backgroundColor: '#C3E3FE'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {

            }

          }}
        />
        <Stack.Screen
          name="otp"
          component={OTPScreen}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#C3E3FE'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {

            }

          }}
        />
        <Stack.Screen
          name="Other"
          component={OtherScreen}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#C3E3FE'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {

            }

          }}
        />

        <Stack.Screen
          name="MyAddress"
          component={MyAddressScreen}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#C3E3FE'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {

            }

          }}
        />

        <Stack.Screen
          name="MyProfile"
          component={MyProfileScreen}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#C3E3FE'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {

            }

          }}
        />

        <Stack.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#C3E3FE'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {

            }

          }}
        />

        <Stack.Screen
          name="SelectedBranch"
          component={SelectedBranchScreen}
          options={{
            headerShown: false,
            title: '',
            headerStyle: {
              backgroundColor: '#C3E3FE'
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerTitleStyle: {

            }

          }}
        />



      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;