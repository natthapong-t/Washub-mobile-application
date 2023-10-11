import * as React from 'react';
import { useState } from 'react';
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

// import { name as appName } from './app.json';
// import { useFonts } from 'expo-font';
// import { assets } from './react-native.config';
import bgImg from '../assets/bg.png'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BranchList from './data/BranchList';

import { Icon } from '@rneui/themed';

import { get, ref, query, orderByChild, equalTo, getDatabase } from 'firebase/database';

import { getAuth, PhoneAuthProvider, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';


const screen = Dimensions.get('screen');




const HomeMainMenu = ({ navigation, route, phoneNumber }) => {
    const logo_text = require('../assets/logo_text.png');
    const [text, setText] = React.useState("");
    const [userData, setUserData] = useState(null);

    const fetchUserDataByPhoneNumber = async (phoneNumber) => {
        const db = getDatabase();
        const usersRef = ref(db, 'users');

        try {
            const usersSnapshot = await get(usersRef);
            if (usersSnapshot.exists()) {
                const users = usersSnapshot.val();
                const userKey = Object.keys(users).find(key => users[key].phoneNumber === phoneNumber);

                if (userKey) {
                    const userData = users[userKey];
                    return userData;
                } else {
                    throw new Error('User not found');
                }
            } else {
                throw new Error('No users found');
            }
        } catch (error) {
            throw new Error('Error fetching user data: ' + error.message);
        }
    };


    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserDataByPhoneNumber(phoneNumber);
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [phoneNumber]);

    return (

        <PaperProvider theme={theme}>

            <View style={styles.container}>
                <View style={styles.banner}>
                </View>

                <View style={styles.containerRow2}>
                    <TouchableOpacity style={styles.AddressButton} onPress={() => console.log('address')} activeOpacity={0.85}>
                        <Icon
                            name='location-sharp'
                            color='#78A2CC'
                            type='ionicon'
                            size={30}
                        />

                        <Text style={{
                            fontFamily: 'Prompt-Regular',
                            color: '#757575',
                            fontSize: 14,
                        }}>
                            
                            {userData ? (
                                <Text> {userData.address}</Text>
                            ) : (
                                <Text>Loading...</Text>
                            )}

                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.FavButton} onPress={() => console.log('favorite')} activeOpacity={0.85}>
                        <Icon
                            name='heart'
                            color='#FF5656'
                            type='ionicon'
                            size={35}
                        />
                    </TouchableOpacity>

                </View>

                <View style={styles.containerRow}>
                    <TouchableOpacity style={styles.button} onPress={() => console.log('wash now')} activeOpacity={0.85}>
                        <Text
                            style={styles.text}
                        >
                            ซักผ้าเลย
                        </Text>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/laundry-basket.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={() => console.log('recent')} activeOpacity={0.85}>
                        <Text style={styles.text}>คำสั่งซื้อ</Text>
                        <Image
                            style={styles.tinyLogo}
                            source={require('../assets/laundry-bike.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={[styles.card, styles.elevation]}>
                    <TextInput
                        left={<TextInput.Icon icon="magnify" />}
                        right={<TextInput.Icon icon="filter-variant" />}
                        placeholderTextColor='#A4A6A8'
                        mode={'flat'}
                        placeholder='ค้นหาชื่อร้านได้เลย'
                        placeholderStyle={styles.InputForm}
                        style={styles.InputForm}
                        labelStyle={styles.inputLabel}
                        onChangeText={text => setText('')}
                        selectionColor='#88AED0'
                        cursorColor='#88AED0'
                        underlineColor='rgba(255, 255, 255, 0)'
                        activeUnderlineColor='rgba(255, 255, 255, 0)'
                        outlineColor='#88AED0'
                        activeOutlineColor='#88AED0'
                        textColor='#1b1b1b'
                        height='90'
                    />

                </View>

                <ScrollView style={styles.scrollStyle} overScrollMode="never" showsVerticalScrollIndicator={false} >
                    <BranchList
                        img={require('.././assets/branch-logo.png')}
                        title="ร้านซักผ้า 1"
                    />

                    <BranchList
                        img={require('.././assets/branch-logo.png')}
                        title="ร้านซักผ้า 2"
                    />

                    <BranchList
                        img={require('.././assets/branch-logo.png')}
                        title="ร้านซักผ้า 3"
                    />

                    <BranchList
                        img={require('.././assets/branch-logo.png')}
                        title="ร้านซักผ้า 4"
                    />

                    <BranchList
                        img={require('.././assets/branch-logo.png')}
                        title="ร้านซักผ้า 5"
                    />
                </ScrollView>



            </View>


        </PaperProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    containerRow: {
        marginTop: 20,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerRow2: {
        width: "100%",
        justifyContent: 'space-between',
        paddingHorizontal: 5,
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
    button: {
        elevation: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        width: 190,
        height: 115,
    },
    tinyLogo: {
        width: 60,
        height: 60,
    },
    text: {
        fontFamily: 'Prompt-Regular',
        color: '#1b1b1b',
        marginRight: 10,
        fontSize: 16,
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
        flexDirection: "row",
        alignItems: "center",
        width: 375,
    },
    elevation: {
        elevation: 5,
        shadowColor: '#1b1b1b',
    },
    scrollStyle: {
        marginTop: 10,
    },
    FavButton: {
        elevation: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        width: 50,
        height: 50,
    },
    AddressButton: {
        paddingLeft: 5,
        paddingRight: 10,
        elevation: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#D8EDFF',
        height: 50,
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


export default HomeMainMenu;