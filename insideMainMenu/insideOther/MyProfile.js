import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';

import {
    StyleSheet, Text, View, Platform,
    TouchableOpacity, SafeAreaView, Alert,
    Image, AppRegistry, ImageBackground, Pressable, TouchableHighlight
} from 'react-native';

import {
    Button, TextInput, Avatar,
    Provider as PaperProvider, DefaultTheme,
    configureFonts, MD2LightTheme
} from 'react-native-paper';



import Constants from 'expo-constants';

import { get, ref, query, orderByChild, equalTo, getDatabase, update } from 'firebase/database';

import { Icon } from '@rneui/themed';

import { getAuth, PhoneAuthProvider, signInWithCredential, onAuthStateChanged, signOut } from "firebase/auth";

import { TextInput as RNTextInput } from 'react-native';




const MyProfile = ({ navigation, route }) => {
    const [username, setUsername] = useState('');  // Updated to use state
    const { phoneNumber } = route.params;
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

    const handleSave = async () => {
        try {
            
            if (!username.trim()) {
                console.log('No changes to update.');
                Alert.alert('ไม่มีการเปลี่ยนแปลง', 'กรุณากรอกข้อมูลที่ต้องการเปลี่ยน');
                return;
            }

            const db = getDatabase();
            const usersRef = ref(db, 'users');

            // Find the user by phoneNumber
            const userQuery = query(usersRef, orderByChild('phoneNumber'), equalTo(phoneNumber));
            const userSnapshot = await get(userQuery);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                const userKey = Object.keys(userData)[0]; // Assuming there's only one user with a particular phone number

                // Reference the specific user using their key
                const userRef = ref(db, `users/${userKey}`);

                // Prepare the data to update
                const updatedData = {};
                if (username.trim()) {
                    updatedData.username = username;
                }

                await update(userRef, updatedData);

                console.log('User data updated successfully:', userData);
                Alert.alert('บันทึกข้อมูลสำเร็จ', 'ข้อมูลถูกบันทึกเรียบร้อย');
            } else {
                console.error('User not found');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
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
            <StatusBar style="auto" />

            <View style={styles.View}>
                <View style={styles.MenuHeader}>
                    <Text style={styles.headerText}>ข้อมูลส่วนตัว : </Text>
                    <Text style={styles.nameOfUser}>{userData ? (<Text> {userData.username}</Text>) : (<Text>Loading...</Text>)}</Text>
                </View>

                <View style={styles.infoBox}>
                    <TextInput
                        right={<TextInput.Icon icon="pencil" color = "#757575"/>}
                        placeholder={(username !== null && username !== '') ? username : (userData && userData.username) || ''}
                        placeholderTextColor='#757575'
                        mode={'flat'}
                        style={styles.InputStyle}
                        onChangeText={(val) => setUsername(val)}
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

                <View style={styles.infoBox}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        editable = {false}
                        placeholder={(phoneNumber !== null && phoneNumber !== '') ? phoneNumber : (userData && userData.phoneNumber) || ''}
                        placeholderTextColor='#A4A6A8'
                        mode={'flat'}
                        style={styles.InputStyle}
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



                <TouchableOpacity style={styles.SaveButton}
                    activeOpacity={0.85}
                    onPress={handleSave}
                >
                    <Text style={styles.ButtonLabel}> บันทึกข้อมูล </Text>


                </TouchableOpacity>





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
    infoBox: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    ButtonLabel: {
        fontFamily: 'Prompt-Bold',
        fontSize: 15,
        color: '#454545',
    },
    SaveButton: {
        flexDirection: "row",
        justifyContent: 'center',
        paddingVertical: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: "#C3E3FE",
    },
    InputStyle: {
        fontFamily: 'Prompt-Regular',
        backgroundColor: '#f2f2f2',
        borderRadius: 15,
        margin: 4,
        width: '100%',
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


export default MyProfile;
