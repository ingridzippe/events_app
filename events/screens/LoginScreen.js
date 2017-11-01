import React, { Component } from 'react';
import {
 AsyncStorage,
 View,
 Text,
 TouchableOpacity,
 TextInput,
} from 'react-native';
import styles from '../styles/styles';

// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

const domain = 'https://something-horizons.herokuapp.com';

class LoginScreen extends React.Component {
 static navigationOptions = {
   title: 'Login',
   header: null
 };
 constructor(props) {
   super(props);
   this.state = {
     username: '',
     password: ''
   };
 }
 postLogin() {
 console.log('signing in');
 console.log('domain', domain);
 return fetch(`${domain}/login`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({
     username: this.state.username,
     password: this.state.password
   })
 })
   .then((response) => response.json())
   .then((responseJson) => {
     if (responseJson.success) {
       AsyncStorage.setItem('user', JSON.stringify(responseJson.user));
       this.props.navigation.navigate('Messages');
     } else {
       alert('Invalid credentials bruh');
     }
   })
   .catch((err) => {
     /* do something if there was an error with fetching */
     console.log('it errored', err);
   });
 }
 render() {
   return (
       <View style={styles.container}>
         <Text style={styles.textBig}>Drip</Text>
         <TextInput
           style={styles.input}
           placeholder='Username'
           onChangeText={(text) => this.setState({ username: text })}
         />
         <TextInput
           style={styles.input}
           placeholder='Password'
           secureTextEntry={true}
           onChangeText={(text) => this.setState({ password: text })}
         />
         <TouchableOpacity
           style={[styles.button, styles.buttonBlue]}
           onPress={() => { this.postLogin(); }}
         >
           <Text style={styles.buttonLabel}>Login</Text>
         </TouchableOpacity>
         <Text style={styles.or}>OR</Text>
         <Text style={styles.or}>Log In With Facebook</Text>
         <Text
           style={styles.or}
           onPress={() => { this.props.navigation.navigate('Register'); }}
         >Don't have an account? Sign up.</Text>
       </View>
   );
 }
}

export default LoginScreen;
