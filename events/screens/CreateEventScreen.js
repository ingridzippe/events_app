import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
import styles from '../styles/styles';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';
// const domain = 'https://something-horizons.herokuapp.com';

// var ImagePicker = require('react-native-image-crop-picker');

class CreateEventScreen extends React.Component {
  static navigationOptions = {
    title: 'CreateEvent'
  };
  constructor(props) {
    super(props);
    this.state = {
        user: '',
        displayName: '',
        eventDate: '',
        eventLocation: '',
        eventDescription: ''
    };
  }
  postCreateEvent() {
  console.log('creating event');
  return fetch(`${domain}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          eventDate: this.state.eventDate,
          eventLocation: this.state.eventLocation,
          eventDescription: this.state.eventDescription
      })
    })
    .then((response) => {
        console.log('RESPONSE', response);
        response.json();
    })
    .then((responseJson) => {
      /* do something with responseJson and go back to the Login view but
       * make sure to check for responseJson.success! */
      console.log('responseJson', responseJson);
      if (responseJson.success === true) {
        console.log('RESPONSE EVENT');
      } else {
        alert('invalid');
      }
      console.log(responseJson);
    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log('it errored', err);
    });
  }
  uploadImage() {
    //   ImagePicker.openCamera({
    //     width: 300,
    //     height: 400,
    //     cropping: true
    //   }).then(image => {
    //     console.log(image);
    //   });
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.textBig}>Create an event.</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => { this.uploadImage(); }}
          >
            <Text style={styles.buttonLabel}>Upload an Image</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder='When is it?'
            onChangeText={(text) => this.setState({ eventDate: text })}
          />
          <TextInput
            style={styles.input}
            placeholder='Location'
            onChangeText={(text) => this.setState({ eventLocation: text })}
          />
            <TextInput
              style={styles.input}
              placeholder='Description'
              onChangeText={(text) => this.setState({ eventDescription: text })}
            />
          <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => { this.postCreateEvent(); }}
          >
            <Text style={styles.buttonLabel}>Post Your Event</Text>
          </TouchableOpacity>
        </View>
    );
  }
}

export default CreateEventScreen;
