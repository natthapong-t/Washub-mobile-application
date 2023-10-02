import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Button, TextInput, Avatar  } from 'react-native-paper';
import { name as appName } from './app.json';


const MyComponent = () => {
  return (
    <View style = {styles.View}>
      <Avatar.Image size={250} backgroundColor={'#fff'} justifyContent={'center'} source={require('./assets/mascot.png')} />
      <TextInput label="Username" style = {styles.InputForm} backgroundColor = {'#F2F2F2'} borderRadius = {15}/>
      <TextInput label="Password" style = {styles.InputForm} backgroundColor = {'#F2F2F2'} borderRadius = {15} secureTextEntry />
      <Button mode="contained" onPress={() => console.log('clicked')} style = {styles.Button} >
        Login
      </Button>
    </View>
  );
};

// function Untitled(props) {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button2}>
//         <Text style={styles.btnText}>Button</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }


//it's like css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    paddingTop: 5,
    width: 150,
    height: 50,
    backgroundColor: "rgba(146,210,232,1)",
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 25,
  
  },
  btnText: {
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: 'center',
    fontWeight: 'light'
  },
  Button: {
    borderBottomWidth: 0,
    backgroundColor : '#88AED0',
    margin: 4,
    width: 300,
  },
  View : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding : 16,
    
  },
  InputForm : {
    backgroundColor : '#fff',
    margin: 4,
    width: 300,
  },
  logo: {
    width: 60,
    height: 60,
  },
});
export default MyComponent;