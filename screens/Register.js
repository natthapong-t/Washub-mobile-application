import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';

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

import bgImg from '../assets/bg.png'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getDatabase, ref, set, push } from 'firebase/database';


const Register = ({ navigation }) => {
    const logo_text = require('../assets/logo_text.png');
    const [text, setText] = React.useState("");

    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const handleRegister = () => {
        const db = getDatabase();
        const usersRef = ref(db, 'users');
      
        const userData = {
          username,
          phoneNumber,
          address,
          postalCode
        };
      
        // Generate a new unique key for the user
        const newUserKey = push(usersRef).key;
      
        // Set the new user data under the generated key
        set(ref(db, `users/${newUserKey}`), userData)
          .then(() => {
            console.log('User registered and data stored in the database:', userData);
          })
          .catch((error) => {
            console.error('Error storing user data:', error);
          });
      };


    return (

        <PaperProvider theme={theme}>
            <ImageBackground ImageBackground source={bgImg} style={styles.View}>
                <View style={styles.View}>


                    <Image
                        style={{ width: 200, height: 60, marginVertical: 8 }}
                        source={logo_text}
                    />


                    <TextInput
                        left={<TextInput.Icon icon="account" disabled />}
                        placeholderTextColor='#A4A6A8'
                        mode={'flat'}
                        placeholder='ชื่อผู้ใช้'
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
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />

                    <TextInput
                        left={<TextInput.Icon icon="phone" disabled />}
                        keyboardType="number-pad"
                        placeholderTextColor='#A4A6A8'
                        mode={'flat'}
                        placeholder='เบอร์โทรศัพท์'
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
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                    />

                    <TextInput
                        left={<TextInput.Icon icon="map-marker" disabled />}
                        placeholderTextColor='#A4A6A8'
                        mode={'flat'}
                        placeholder='ที่อยู่'
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
                        value={address}
                        onChangeText={text => setAddress(text)}
                    />

                    <TextInput
                        left={<TextInput.Icon icon="sign-direction" disabled />}
                        keyboardType="number-pad"
                        placeholderTextColor='#A4A6A8'
                        mode={'flat'}
                        placeholder='รหัสไปรษณีย์'
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
                        value={postalCode}
                        onChangeText={text => setPostalCode(text)}
                    />




                    <Button
                        mode="elevated"
                        style={styles.RegisterButton}
                        labelStyle={styles.RegisterButtonLabel}
                        onPress={handleRegister}
                    >
                        สมัครสมาชิก
                    </Button>
                    <Text style={styles.textWarning}>การดำเนินการต่อแสดงว่าคุณยอมรับข้อกำหนดในการให้บริการและนโยบายความเป็นส่วนตัวของเรา</Text>
                    <Text style={styles.textBtn}
                        onPress={() => navigation.navigate('Login')}
                    >หากมีบัญชีอยู่แล้ว เข้าสู่ระบบที่นี่
                    </Text>





                </View>
            </ImageBackground>

        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    View: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RegisterButton: {
        borderRadius: 15,
        borderBottomWidth: 0,
        backgroundColor: '#88AED0',
        margin: 4,
        width: 300,
    },
    RegisterButtonLabel: {
        fontFamily: 'Prompt-Bold',
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
    textBtn: {
        fontFamily: 'Prompt-Regular',
        color: '#88AED0',
    },
    textWarning: {
        fontFamily: 'Prompt-Regular',
        textAlign: 'center',
        width: 300,
        color: '#A4A6A8',
    }
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

export default Register;