import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';

import {
    StyleSheet, Text, View, Platform,
    TouchableOpacity, SafeAreaView, Alert,
    Image, AppRegistry, ImageBackground, Pressable, TouchableHighlight, Modal
} from 'react-native';

import {
    Button, TextInput, Avatar,
    Provider as PaperProvider, DefaultTheme,
    configureFonts, MD2LightTheme
} from 'react-native-paper';



import Constants from 'expo-constants';

import { get, ref, query, orderByChild, equalTo, getDatabase } from 'firebase/database';

import { Icon } from '@rneui/themed';

import { getAuth, PhoneAuthProvider, signInWithCredential, onAuthStateChanged, signOut } from "firebase/auth";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyAddress from './insideOther/MyAddress';

import { useNavigation, useIsFocused} from '@react-navigation/native';



const Other = ({ navigation, phoneNumber }) => {


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

    const handleLogout = () => {
        Alert.alert(
            'ยืนยันออกจากระบบ',
            'ท่านต้องการที่จะออกจากระบบหรือไม่?',
            [
                {
                    text: 'ยกเลิก',
                    onPress: () => console.log('ยกเลิกการออกจากระบบ'),
                    style: 'cancel'
                },
                {
                    text: 'ออกจากระบบ',
                    onPress: async () => {
                        const auth = getAuth();
                        try {
                            await signOut(auth);
                            Alert.alert('ออกจากระบบสำเร็จ', 'ท่านได้ทำการออกจากระบบแล้ว.');
                            navigation.navigate('Home');
                        } catch (error) {
                            console.error('Error signing out:', error);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };

    // Fetch user data when the screen is focused
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            fetchUserDataByPhoneNumber(phoneNumber)
                .then(userData => setUserData(userData))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [isFocused]);



    return (

        <PaperProvider theme={theme}>
            <StatusBar style="auto" />

            <View style={styles.View}>
                <View style={styles.MenuHeader}>
                    <Text style={styles.headerText}>สวัสดี</Text>
                    <Text style={styles.nameOfUser}>{userData ? (<Text> {userData.username}</Text>) : (<Text>Loading...</Text>)}</Text>
                </View>

                <TouchableHighlight
                    activeOpacity={0.85}
                    underlayColor="#f2f2f2"
                    onPress={() => navigation.navigate('MyProfile', {phoneNumber}, {navigation})}
                >
                    <View style={styles.Button}>
                        <Text style={styles.ButtonLabel}>แก้ไขข้อมูลส่วนตัว</Text>
                        <Icon
                            name='chevron-forward'
                            color='#757575'
                            type='ionicon'
                            size={30}
                        />
                    </View>

                </TouchableHighlight>

                <TouchableHighlight
                    activeOpacity={0.85}
                    underlayColor="#f2f2f2"
                    onPress={() => navigation.navigate('MyAddress', {phoneNumber}, {navigation})}
                >
                    <View style={styles.Button}>
                        <Text style={styles.ButtonLabel}>ที่อยู่ของฉัน</Text>
                        <Icon
                            name='chevron-forward'
                            color='#757575'
                            type='ionicon'
                            size={30}
                        />
                    </View>

                </TouchableHighlight>


                <TouchableHighlight
                    activeOpacity={0.85}
                    underlayColor="#f2f2f2"
                    onPress={handleLogout}
                >
                    <View style={styles.Button}>
                        <Text style={styles.ButtonLabel}>ออกจากระบบ</Text>
                        <Icon
                            name='chevron-forward'
                            color='#757575'
                            type='ionicon'
                            size={30}
                        />
                    </View>

                </TouchableHighlight>







            </View>


        </PaperProvider>
    )
}


const styles = StyleSheet.create({
    View: {
        marginTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        margin: 4,
    },
    textBtn: {
        color: '#88AED0',
        fontFamily: 'Prompt-Regular',
    },
    MenuHeader: {
        alignItems: 'center',
        paddingHorizontal: 25,
        flexDirection: 'row',
        height: 85,
        borderBottomColor: '#D4D4D4',
        borderBottomWidth: 2,

    },
    headerText: {
        color: '#1b1b1b',
        fontFamily: 'Prompt-Bold',
        fontSize: 18,
    },
    nameOfUser: {
        color: '#88AED0',
        fontFamily: 'Prompt-Bold',
        fontSize: 18,
    },
    Button: {
        borderBottomColor: '#D4D4D4',
        borderBottomWidth: 2,
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    ButtonLabel: {
        fontFamily: 'Prompt-Regular',
        fontSize: 15,
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


export default Other;