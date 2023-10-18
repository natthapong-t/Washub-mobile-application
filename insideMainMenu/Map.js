import * as React from 'react';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';

import {
    StyleSheet, Text, View,
    TouchableOpacity, SafeAreaView,
    Image, AppRegistry, ImageBackground, Pressable
} from 'react-native';

import Constants from 'expo-constants';

import {
    Button, TextInput, Avatar,
    Provider as PaperProvider, DefaultTheme,
    configureFonts, MD2LightTheme, shadow
} from 'react-native-paper';

// import { name as appName } from './app.json';
// import { useFonts } from 'expo-font';
// import { assets } from './react-native.config';
import bgImg from '../assets/bg.png'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapView, { Marker } from 'react-native-maps';

const Map = ({ navigation }) => {

    const markers = [
        {
            title: 'Otteri สาขา U-PLAZA',
            description: 'Otteri สาขา U-PLAZA ม.ขอนแก่น',
            coordinate: {
                latitude: 16.480535597954024,
                longitude: 102.81819371368468,
            },
        },
        {
            title: 'Otteri ปตท',
            description: 'Otteri wash&dry ปตท. มหาวิทยาลัยขอนแก่น',
            coordinate: {
                latitude: 16.479041982726912,
                longitude: 102.8141559751433,
            },
        },
        {
            title: 'Otteri ประตูเขียว',
            description: 'Otteri Wash & Dry สาขาประตูเขียว',
            coordinate: {
                latitude: 16.484018999864833, 
                longitude: 102.8108470379454,
            },
        },
        {
            title: 'Otteri โคลัมโบ',
            description: 'Otteri wash & Dry สาขา โคลัมโบ มข.',
            coordinate: {
                latitude: 16.4802736060914, 
                longitude: 102.80411607394527,
            },
        },
        // Add more markers as needed
    ];

    return (

        <PaperProvider theme={theme}>
            <StatusBar style="auto" />

            <View style={styles.View}>
                <View style={styles.MenuHeader}>
                    <Text style={styles.headerText}>แผนที่</Text>
                </View>
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 16.480535597954024,
                        longitude: 102.81819371368468,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    }}
                >
                    {markers.map((marker, index) => (
                        <Marker
                            fontSize = '15'
                            pinColor='#88AED0'
                            key={index}
                            coordinate={marker.coordinate}
                            title={marker.title}
                            description={marker.description}
                            image={require('../assets/custom_marker.png')}
                        />
                    ))}
                </MapView>


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
    },
    PriceLabel: {
        fontFamily: 'Prompt-Bold',
        fontSize: 15,
    },
    HistoryLabel: {
        fontFamily: 'Prompt-Regular',
        fontSize: 15,
    },
    statusHistoryLabel: {
        fontFamily: 'Prompt-Bold',
        fontSize: 15,
        color: '#88AED0',
    },
    HistoryLabelContainer: {
        flexDirection: 'column',
    },
    insideHistoryLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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


export default Map;