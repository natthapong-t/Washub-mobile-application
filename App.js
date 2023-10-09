import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'
import HomeScreen from './screens/Home'
import MainMenuScreen from './screens/MainMenu'
import OTPScreen from './screens/OTP'



import { useFonts } from 'expo-font';

import { getAuth, RecaptchaVerifier } from "firebase/auth";

import 'firebase/auth';
import 'firebase/database';

const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp, firebase } from "firebase/app";
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

  const [fontsLoaded] = useFonts({
    'Prompt-Light': require('./assets/fonts/Prompt-Light.ttf'),
    'Prompt-Regular': require('./assets/fonts/Prompt-Regular.ttf'),
    'Prompt-Bold': require('./assets/fonts/Prompt-Bold.ttf'),
  });


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
          name="OTP"
          component={OTPScreen}
          options={{
            headerShown: true,
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