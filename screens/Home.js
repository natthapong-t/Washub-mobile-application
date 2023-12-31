import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import {
  StyleSheet, Text, View,
  TouchableOpacity, SafeAreaView, Platform,
  Image, AppRegistry, ImageBackground, LogBox 
} from 'react-native';

import {
  Button, TextInput, Avatar,
  Provider as PaperProvider, DefaultTheme,
  configureFonts, MD2LightTheme
} from 'react-native-paper';

// import { name as appName } from './app.json';
// import { useFonts } from 'expo-font';
// import { assets } from './react-native.config';

import bgImg from '../assets/bg.png'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//ignore warning
LogBox.ignoreLogs(['No native ExpoFirebaseCore module found']);
LogBox.ignoreLogs(['You are initializing Firebase Auth for React Native without providing AsyncStorage. Auth state will default to memory persistence and will not']);
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state. Check:']);

const fontConfig = {
  customVariant: {
    fontFamily: Platform.select({
      web: 'Prompt-Regular',
      ios: 'Prompt-Regular',
      android: 'Prompt-Regular',
      default: 'Prompt-Regular',
    }),
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 20,
  }
};



const MyComponent = ({ navigation }) => {

  const WashubMascot = require('../assets/mascot.png');
  const logo_text = require('../assets/logo_text.png');
  const [text, setText] = React.useState("");
  return (

    <PaperProvider theme={theme}>
      <StatusBar backgroundColor="#C3E3FE" />
      <ImageBackground ImageBackground source={bgImg} style={styles.View}>
        <View style={styles.View}>

          <Image
            style={{ width: 200, height: 200, marginVertical: 8 }}
            source={WashubMascot}
          />

          <Image
            style={{ width: 200, height: 60, marginVertical: 8 }}
            source={logo_text}
          />


          <Button
            mode="elevated"
            style={styles.LoginButton}
            labelStyle={styles.LoginButtonLabel}
            onPress={() => navigation.navigate('Login')}
          >
            เข้าสู่ระบบ
          </Button>

          <Button
            mode="elevated"
            style={styles.RegisterButton}
            labelStyle={styles.RegisterButtonLabel}
            onPress={() => navigation.navigate('Register')}
          >
            สมัครสมาชิก
          </Button>

        </View>
      </ImageBackground>

    </PaperProvider>

  );

};



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
    color: '#88AED0',
    fontFamily: 'Prompt-Bold', //Prompt-Regular Prompt-Bold
  },
  LoginButtonLabel: {
    height: 50,
    verticalAlign: 'middle',
    color: '#fff',
    fontFamily: 'Prompt-Bold', //Prompt-Regular Prompt-Bold
  },
  inputLabel: {
    color: '#88AED0',
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

export default MyComponent;
