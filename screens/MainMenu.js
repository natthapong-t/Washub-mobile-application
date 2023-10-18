import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';

import {
    StyleSheet, Text, View,
    TouchableOpacity, SafeAreaView,
    Image, AppRegistry, ImageBackground, Pressable, Modal 
} from 'react-native';

import {
    Button, TextInput, Avatar,
    Provider as PaperProvider, DefaultTheme,
    configureFonts, MD2LightTheme, BottomNavigation, BottomNavigationTab
} from 'react-native-paper';

// import { name as appName } from './app.json';
// import { useFonts } from 'expo-font';
// import { assets } from './react-native.config';
import bgImg from '../assets/bg.png'

import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeMainMenuScreen from '../insideMainMenu/HomeMainMenu'
import MapScreen from '../insideMainMenu/Map'
import RecentScreen from '../insideMainMenu/Recent'
import OtherScreen from '../insideMainMenu/Other'

import { get, ref, query, orderByChild, equalTo, getDatabase } from 'firebase/database';

import { getAuth, PhoneAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';




//Screen names
const homeName = "Home";
const mapName = "Map";
const recentName = "Recent";
const otherName = "Other";


const Tab = createBottomTabNavigator();



const MainMenu = ({ navigation, route }) => {
    const logo_text = require('../assets/logo_text.png');
    const [text, setText] = React.useState("");
    const phoneNumber = route.params.phoneNumber;
    //const auth = route.params.auth;

    // Branch data
    const branches = [
        { img: require('../assets/branch-logo.png'), title: 'ร้านซักผ้า สาขา U-PLAZA ม.ขอนแก่น' },
        { img: require('../assets/branch-logo.png'), title: 'Otteri สาขา ปตท. ม.ขอนแก่น' },
        { img: require('../assets/branch-logo.png'), title: 'Otteri สาขา ประตูเขียว ม.ขอนแก่น' },
        { img: require('../assets/branch-logo.png'), title: 'Otteri สาขา โคลัมโบ ขอนแก่น' },
        { img: require('../assets/branch-logo.png'), title: 'Cleanpro Express KKU' },
        { img: require('../assets/branch-logo.png'), title: 'นกเครื่องซักผ้าหยอดเหรียญ สาขาหลังม.ขอนแก่น' },
    ];
    
    return (
        <View style={styles.container}>

            <StatusBar style="auto" />


            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        } else if (rn === mapName) {
                            iconName = focused ? 'location' : 'location-outline';

                        } else if (rn === recentName) {
                            iconName = focused ? 'refresh' : 'refresh-outline';
                        } else if (rn === otherName) {
                            iconName = focused ? 'menu' : 'menu-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#88AED0',
                    tabBarInactiveTintColor: 'grey',
                    tabBarLabelStyle: { paddingBottom: 0, fontSize: 0 },
                    tabBarStyle: { padding: 0, height: 60, backgroundColor: '#f2f2f2' }

                })}
            >

                <Tab.Screen
                    name={homeName}
                    options={{ headerShown: false }}
                >
                    {() => <HomeMainMenuScreen phoneNumber={phoneNumber} navigation={navigation} branchData={branches}/>}
                </Tab.Screen>


                <Tab.Screen
                    name={mapName}
                    options={{ headerShown: false }}
                >
                    {() => <MapScreen phoneNumber={phoneNumber} navigation={navigation}/>}
                </Tab.Screen>


                <Tab.Screen
                    name={recentName}
                    options={{ headerShown: false }}
                >
                    {() => <RecentScreen phoneNumber={phoneNumber} navigation={navigation}/>}
                </Tab.Screen>


                <Tab.Screen
                    name={otherName}
                    options={{ headerShown: false }}
                >
                    {() => <OtherScreen phoneNumber={phoneNumber} navigation={navigation}/>}
                </Tab.Screen>


            </Tab.Navigator>












        </View>
    )
}

const styles = StyleSheet.create({
    View: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoginButton: {
        borderRadius: 15,
        borderBottomWidth: 0,
        backgroundColor: '#88AED0',
        margin: 4,
        width: 300,
    },
    LoginButtonLabel: {
        fontFamily: 'Prompt-Bold',
        height: 50,
        verticalAlign: 'middle',
        color: '#fff', // Change the text color here
    },
    inputLabel: {
        fontFamily: 'Prompt-Regular',
        color: '#88AED0', // Change the text color here
        height: 50

    },
    InputForm: {
        fontFamily: 'Prompt-Regular',
        backgroundColor: '#f2f2f2',
        borderRadius: 15,
        margin: 4,
        width: 300,
    },
    image: {
        margin: 4,
    },
    textBtn: {
        color: '#88AED0',
        fontFamily: 'Prompt-Regular',
    },
    container: {
        flex: 1,
    },
});


const theme = {

    ...DefaultTheme,
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


export default MainMenu;