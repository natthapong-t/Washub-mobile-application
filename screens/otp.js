import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';

import {
    StyleSheet, Text, View,
    TouchableOpacity, SafeAreaView,
    Image, AppRegistry, ImageBackground, Pressable
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

import { getAuth, PhoneAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';

import { Icon } from '@rneui/themed';

import Constants from 'expo-constants';


const OTPScreen = ({ navigation, route }) => {
    const logo_text = require('../assets/logo_text.png');
    const [text, setText] = React.useState("");
    const [verificationCode, setVerificationCode] = React.useState();
    const [message, showMessage] = React.useState();
    const attemptInvisibleVerification = true;


    const auth = route.params.auth;
    const verificationId = route.params.verificationId;
    const phoneNumber = route.params.phoneNumber;


    return (

        <PaperProvider theme={theme}>
            <ImageBackground ImageBackground source={bgImg} style={styles.backgroundStyle}>
                <TouchableOpacity style={styles.BackButton} onPress={() => navigation.goBack()} activeOpacity={0.85}>
                    <Icon
                        name="chevron-back"
                        size={24}
                        color="#1b1b1b"
                        type='ionicon'
                    />
                </TouchableOpacity>
                <View style={styles.View}>


                    <Image
                        style={{ width: 200, height: 60, marginVertical: 8 }}
                        source={logo_text}
                    />

                    <TextInput
                        left={<TextInput.Icon icon="email-receive-outline" disabled />}
                        keyboardType="number-pad"
                        placeholderTextColor='#A4A6A8'
                        mode={'flat'}
                        placeholder='ใส่ OTP ที่ได้รับ'
                        placeholderStyle={styles.InputForm}
                        style={styles.InputForm}
                        labelStyle={styles.inputLabel}
                        selectionColor='#88AED0'
                        cursorColor='#88AED0'
                        underlineColor='rgba(255, 255, 255, 0)'
                        activeUnderlineColor='rgba(255, 255, 255, 0)'
                        outlineColor='#88AED0'
                        activeOutlineColor='#88AED0'
                        textColor='#1b1b1b'
                        height='90'
                        onChangeText={setVerificationCode}
                    />


                    <Button
                        mode="elevated"
                        style={styles.LoginButton}
                        labelStyle={styles.LoginButtonLabel}
                        onPress={async () => {
                            try {
                                const credential = PhoneAuthProvider.credential(
                                    verificationId,
                                    verificationCode
                                );
                                await signInWithCredential(auth, credential);
                                showMessage({ text: 'Phone authentication successful 👍' });
                                navigation.navigate('MainMenu', { phoneNumber })
                            } catch (err) {
                                showMessage({ text: `Error: ${err.message}`, color: 'red' });
                            }
                        }}
                    >
                        เข้าสู่ระบบ
                    </Button>
                    <Text style={styles.textBtn}
                        onPress={() => console.log('get otp again')}
                    >ยังไม่ได้รับ OTP? คลิกที่นี่
                    </Text>

                    {message ? (
                        <TouchableOpacity
                            style={[
                                StyleSheet.absoluteFill,
                                { justifyContent: 'center' },
                            ]}
                            onPress={() => showMessage(undefined)}>
                            <Text
                                style={{
                                    color: message.color || 'blue',
                                    fontSize: 17,
                                    textAlign: 'center',
                                    margin: 20,
                                }}>
                                {message.text}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        undefined
                    )}
                    {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}




                </View>
            </ImageBackground>

        </PaperProvider >
    )
}

const styles = StyleSheet.create({
    View: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundStyle: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
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
        elevation: 3,
        shadowColor: '#757575',
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
    BackButton: {
        elevation: 5,
        marginTop: 15,
        marginLeft: 15,
        flexDirection: 'row',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 30,
        height: 30,
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


export default OTPScreen;