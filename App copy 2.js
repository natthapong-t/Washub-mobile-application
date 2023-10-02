import * as React from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  StyleSheet, Text, View,
  TouchableOpacity, SafeAreaView,
  Image, AppRegistry, ImageBackground
} from 'react-native';

import {
  Button, TextInput, Avatar,
  Provider as PaperProvider, DefaultTheme,
  configureFonts, MD2LightTheme
} from 'react-native-paper';

import { name as appName } from './app.json';
import { useFonts } from 'expo-font';
import { assets } from './react-native.config';
import bgImg from './assets/bg.png'

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './screens/Login'
import RegisterScreen from './screens/Register'



const MyComponent = () => {

  const WashubMascot = require('./assets/mascot.png');
  const logo_text = require('./assets/logo_text.png');
  const [text, setText] = React.useState("");
  return (
    
    <PaperProvider theme={theme}>
      <ImageBackground ImageBackground source={bgImg} style={styles.View}>
        <View style={styles.View}>

          <Image
            style={{ width: 200, height: 200, marginVertical: 4 }}
            source={WashubMascot}
          />

          <Image
            style={{ width: 200, height: 60, marginVertical: 4 }}
            source={logo_text}
          />


          


          <Button
            mode="elevated"
            style={styles.LoginButton}
            labelStyle={styles.LoginButtonLabel}
            onPress={() => console.log('Login button pressed')}
          >
            เข้าสู่ระบบ
          </Button>

          <Button
            mode="elevated"
            style={styles.RegisterButton}
            labelStyle={styles.RegisterButtonLabel}
            onPress={() => console.log('Register button pressed')}
          >
            สมัครสมาชิก
          </Button>

        </View>
      </ImageBackground>

    </PaperProvider>

  );

};



// put in return (form)
{/* <TextInput
            mode={'outlined'}
            style={styles.InputForm} labelStyle={styles.inputLabel}
            onChangeText={text => setText('')}
            selectionColor='#88AED0'
            cursorColor='#88AED0'
            underlineColor='rgba(255, 255, 255, 0)'
            activeUnderlineColor='rgba(255, 255, 255, 0)'
            outlineColor='#88AED0'
            activeOutlineColor='#88AED0'
            textColor='#88AED0'
            height='50'
          /> */}


const theme = {

  ...DefaultTheme,
  fonts: configureFonts({ config: fontConfig, isV3: true }),
  "colors": {
    "primary": "rgb(0, 100, 150)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(204, 229, 255)",
    "onPrimaryContainer": "rgb(0, 30, 49)",
    "secondary": "rgb(80, 96, 111)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(212, 228, 246)",
    "onSecondaryContainer": "rgb(13, 29, 42)",
    "tertiary": "rgb(0, 100, 150)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(204, 229, 255)",
    "onTertiaryContainer": "rgb(0, 30, 49)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(252, 252, 255)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(252, 252, 255)",
    "onSurface": "rgb(26, 28, 30)",
    "surfaceVariant": "rgb(222, 227, 235)",
    "onSurfaceVariant": "rgb(66, 71, 78)",
    "outline": "rgb(114, 120, 126)",
    "outlineVariant": "rgb(194, 199, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 49, 51)",
    "inverseOnSurface": "rgb(240, 240, 244)",
    "inversePrimary": "rgb(145, 205, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(239, 244, 250)",
      "level2": "rgb(232, 240, 247)",
      "level3": "rgb(224, 235, 244)",
      "level4": "rgb(222, 234, 242)",
      "level5": "rgb(217, 231, 240)"
    },

    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(43, 49, 55, 0.4)"
  },
};


const fontConfig = {
  customVariant: {
    fontFamily: Platform.select({
      web: 'Nunito-Regular, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: 'System',
      default: 'Nunito-Regular',
    }),
  }
};


//it's like css
const styles = StyleSheet.create({
  View: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: 'center',
    fontWeight: 'light'
  },
  LoginButton: {
    borderRadius: 15,
    borderBottomWidth: 0,
    backgroundColor: '#88AED0',
    margin: 4,
    width: 300,
  },
  RegisterButton: {
    borderRadius: 15,
    borderBottomWidth: 0,
    backgroundColor: '#fff',
    color: '#88AED0',
    margin: 4,
    width: 300,
  },
  RegisterButtonLabel: {
    height: 50,
    verticalAlign: 'middle',
    color: '#88AED0', // Change the text color here
  },
  LoginButtonLabel: {
    height: 50,
    verticalAlign: 'middle',
    color: '#fff', // Change the text color here
  },
  inputLabel: {
    color: '#88AED0', // Change the text color here
    height: 50
  },
  InputForm: {
    fontFamily: '',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    margin: 4,
    width: 300,
  },
  image: {
    margin: 4,
  },
});

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
         />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyComponent;