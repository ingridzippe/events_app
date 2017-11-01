import React, { Component } from 'react';
import {
  Image,
  Linking,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
// import BottomBar from '../components/BottomBar'
import Icon from 'react-native-vector-icons/FontAwesome';
import SafariView from 'react-native-safari-view';
import styles from '../styles/styles';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

const domain = 'https://something-horizons.herokuapp.com';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      email: '',
      fullname: '',
      username: '',
      password: ''
    };
  }
  // Set up Linking
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('URL', url);
        this.handleOpenURL({ url });
      }
    });
  }
  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  random test() {
    // Remove event listener
    console.log('random test')
  }
  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    this.setState({
      // Decode the user string and parse it into JSON
      user: JSON.parse(decodeURI(user_string))
    });
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
    if (this.state.user) {
        this.props.navigation.navigate('Messages');
    }
  }
  // Handle Login with Facebook button tap
  loginWithFacebook = () => this.openURL('http://localhost:3000/fb/login');
  openURL = (url) => {
    // Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true,
      });
    } // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };

  postLogin() {
    console.log('signup clicked');
    return fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          fullname: this.state.fullname,
          username: this.state.username,
          password: this.state.password,
        })
      })
      .then((response) => {
        console.log('RESPONSE', response);
        this.props.navigation.navigate('Login');
        response.json();
      })
      .then((responseJson) => {
        /* do something with responseJson and go back to the Login view but
         * make sure to check for responseJson.success! */
        console.log('responseJson', responseJson);
        if (responseJson.success === true) {
          this.props.navigation.navigate('Login');
        } else {
          alert('invalid');
        }
      })
      .catch((err) => {
        /* do something if there was an error with fetching */
        console.log('it errored', err);
      });
  }
  // fb() {
  //   fetch('http://localhost:3000/golden')
  //     .then(function (response) {
  //       if (response.status !== 200) {
  //         console.log('Looks like there was a problem. Status Code: ' + response.status);
  //           return;
  //       }
  //       // Examine the text in the response
  //       response.json().then(function (data) {
  //         console.log(data);
  //       });
  //     })
  //     .catch(function (err) {
  //       console.log('Fetch Error :-S', err);
  //     });
  // }
  fb() {
    fetch('http://localhost:3000/fb/login')
      .then((response) => console.log(response))
    // .then((response) => { return response.json() } )
    // .then((response) => {
    //   console.log('RESPONSE', response)
    //   if (response) {
    //     console.log('responseJson', response);
    //   } else { alert('not response.success'); }
    // })
    // .catch((err) => {
    //   console.log(err);
    //   console.log('it errored MMMMM');
    // })
  }
  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.buttonBlue]}
        >
          <Text
            style={styles.buttonLabel}
            onPress={() => { this.loginWithFacebook(); }}
          >Log in with Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.or}>OR</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={(text) => this.setState({ email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder='Full Name'
          onChangeText={(text) => this.setState({ fullname: text })}
        />
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
          <Text style={styles.buttonLabel}>Sign up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RegisterScreen;
