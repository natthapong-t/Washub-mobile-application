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

import { get, ref, query, orderByChild, equalTo, getDatabase } from 'firebase/database';

import { Icon } from '@rneui/themed';

import { getAuth, PhoneAuthProvider, signInWithCredential, onAuthStateChanged, signOut } from "firebase/auth";



