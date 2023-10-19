import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import Constants from 'expo-constants';
import {
    StyleSheet, Text, View,
    TouchableOpacity, SafeAreaView, Dimensions,
    Image, AppRegistry, ImageBackground, Pressable, ScrollView
} from 'react-native';

import {
    Button, TextInput, Avatar,
    Provider as PaperProvider, DefaultTheme,
    configureFonts, MD2LightTheme
} from 'react-native-paper';

import { useIsFocused } from '@react-navigation/native';

// import { name as appName } from './app.json';
// import { useFonts } from 'expo-font';
// import { assets } from './react-native.config';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Icon } from '@rneui/themed';

import { get, ref, query, orderByChild, equalTo, getDatabase } from 'firebase/database';

import { getAuth, PhoneAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';


const screen = Dimensions.get('screen');


const SelectedBranch = ({ navigation, route, phoneNumber, branchData }) => {



    return (

        <PaperProvider theme={theme}>

            <View style={styles.container}>


                <View style={styles.containerRow2}>

                    <View style={styles.containerRow}>
                        <TouchableOpacity style={styles.BackButton} onPress={() => navigation.goBack()} activeOpacity={0.85}>
                            <Icon
                                name="chevron-back"
                                size={24}
                                color="#1b1b1b"
                                type='ionicon'
                            />
                        </TouchableOpacity>

                        <Text style={styles.headerText}>Otteri สาขา U-PLAZA ม.ขอนแก่น</Text>
                    </View>

                    <TouchableOpacity style={styles.ToggleFavButton} onPress={() => console.log('hey')} activeOpacity={0.85}>
                        <Icon
                            name='heart-outline'
                            color='#88AED0'
                            type='ionicon'
                            size={30}
                        />
                    </TouchableOpacity>

                </View>




                <View style={styles.allInfoSection}>
                    <View style={styles.branchGroupInfo}>
                        <View style={[styles.branchInfo, { borderBottomWidth: 1 }, { marginBottom: 3 }, { borderBottomColor: '#757575' }]}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../../assets/washing-machine.png')}
                            />
                            <View style={styles.branchWeight}>
                                <Text style={styles.weightText}>10</Text>
                                <Text style={styles.text}>เครื่องซัก</Text>
                            </View>
                        </View>
                        <View style={styles.branchInfo}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../../assets/drying-machine.png')}
                            />
                            <View style={styles.branchWeight}>
                                <Text style={styles.weightText}>7</Text>
                                <Text style={styles.text}>เครื่องอบ</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.branchWeight}>
                        <Image
                            style={styles.Logo}
                            source={require('../../assets/branch-logo.png')}
                        />
                        <Text style={[styles.text]}>10 กม.</Text>
                    </View>
                    <View style={styles.textContainerColumn}>

                        <View style={styles.textContainerRow}>
                            <Text style={styles.text}>
                                10 กก.
                            </Text>
                            <Text style={styles.text}>
                                28 กก.
                            </Text>
                        </View>

                        <Text style={styles.text}>
                            17 กก.
                        </Text>

                    </View>



                </View>



                <View style={styles.BottomBanner}>
                </View>








            </View>


        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 5,
        borderTopLeftRadius: 5,
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#C3E3FE',
        alignItems: 'center',
    },
    containerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerRow2: {
        width: "100%",
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        marginTop: 20,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',

    },
    banner: {
        width: '100%',
        height: 300,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#C3E3FE',
        position: 'absolute',
        alignItems: 'center',
    },
    BottomBanner: {
        width: '100%',
        height: 550,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: '#fff',
        position: 'absolute',
        alignItems: 'center',
        bottom: 5
    },
    button: {
        elevation: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        width: 180,
        height: 115,
    },
    tinyLogo: {
        width: 45,
        height: 50,
    },
    Logo: {
        width: 80,
        height: 80,
    },
    text: {
        fontFamily: 'Prompt-Regular',
        color: '#1b1b1b',
        fontSize: 16,
    },
    headerText: {
        width: 200,
        fontFamily: 'Prompt-Bold',
        color: '#1b1b1b',
        fontSize: 18,
    },
    inputLabel: {
        fontFamily: 'Prompt-Regular',
        color: '#88AED0',
        height: 50

    },
    InputForm: {
        fontFamily: 'Prompt-Regular',
        backgroundColor: '#f2f2f2',
        borderRadius: 15,
        width: 360,
    },
    card: {
        backgroundColor: "#f2f2f2",
        paddingVertical: 10,
        paddingHorizontal: 0,
        marginHorizontal: 20,
        borderRadius: 15,
        marginTop: 20,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        width: 375,
    },
    elevation: {
        elevation: 5,
        shadowColor: '#1b1b1b',
    },
    scrollStyle: {
        marginTop: 0,
    },
    branchContainer: {
        marginTop: 0,
        width: screen.width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ToggleFavButton: {
        elevation: 5,
        marginRight: 15,
        flexDirection: 'row',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        width: 40,
        height: 40,
    },
    BackButton: {
        elevation: 5,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 30,
        height: 30,
    },
    MenuHeader: {
        alignItems: 'center',
        paddingHorizontal: 25,
        flexDirection: 'row',
        height: 85,
        borderBottomColor: '#fff',
        borderBottomWidth: 2,

    },
    branchInfo: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    allInfoSection: {
        paddingHorizontal: 25,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: screen.width,
    },
    branchGroupInfo: {
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    branchWeight: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    weightText: {
        fontFamily: 'Prompt-Bold',
        fontSize: 20,
    },
    textContainerRow: {
        flexDirection: 'row',

    },
    textContainerColumn: {
        flexDirection: 'column',

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


export default SelectedBranch;