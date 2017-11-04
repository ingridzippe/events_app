import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  // DatePickerIOS,
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import DatePicker from '../components/DatePicker';
// import ImagePicker from 'react-native-image-crop-picker';
import styles from '../styles/styles';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';
// const domain = 'https://something-horizons.herokuapp.com';

// var ImagePicker = require('react-native-image-crop-picker');

// DATE PICKER CODE STARTS HERE

// DATE PICKER CODE ENDS HERE

var defaultProps = {
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
};

class CreateEventScreen extends React.Component {
  static navigationOptions = {
    title: 'Ventful',
    headerLeft: null
  };
  constructor(props) {
    super(props);
    this.state = {
        user: '',
        displayName: '',
        eventDate: '',
        eventLocation: '',
        eventDescription: '',
        date: this.props.date,
        timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
        modalVisible: false,
    };
  }
  setModalVisible(visible) {
    this.setState({modalVisible: true});
  }
  closeModal(visible) {
    this.setState({modalVisible: false});
  }
  postCreateEvent() {
  fetch('http://localhost:3000/create', {
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
        console.log('event did not save')
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
  onDateChange() {
    this.setState({ date: this.state.date });
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.textBig}>Create an event.</Text>
          {/* <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => { this.uploadImage(); }}
          >
            <Text style={styles.buttonLabel}>Upload an Image</Text>
          </TouchableOpacity> */}
          {/* <DatePickerIOS
            date={this.state.date}
            mode="time"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange.bind(this)}
            minuteInterval={10}
          /> */}

          <Modal
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
              <View style={{justifyContent: 'center', width: 300, height: 600}}>
                <DatePicker
                  events={this.props.events}
                />
                <Button
                    title={'Yup'}
                    text={'Set Time'}
                    onPress={this.closeModal.bind(this, false)}
                />

              </View>
            </View>
          </Modal>
          {/* <TouchableOpacity onPress={() => {
            this.setModalVisible(true)
          }}>
            <Text style={{ fontSize: 23 }}>Pick a time</Text>
          </TouchableOpacity> */}

          <TextInput
            style={styles.input}
            placeholder='When'
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
          <BottomBarNav navigation={this.props.navigation} />
        </View>
    );
  }
}

export default CreateEventScreen;
