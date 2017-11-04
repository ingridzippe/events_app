import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import styles from '../styles/styles';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

const domain = 'https://something-horizons.herokuapp.com';

class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: 'Ventful', //you put the title you want to be displayed here
    headerLeft: null
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    fetch('http://localhost:3000/events')
    .then((response) => response.json())
    .then((responseJson) => {
        console.log('responseJson', responseJson);
        if (responseJson.success === true) {
            console.log('RESPONSE JSON MESSAAGES', responseJson);
            this.setState({ dataSource: ds.cloneWithRows(responseJson.events) });
         } else {
            alert('invalid')
         }
         console.log(responseJson);
    })
    .catch((err) => {
      console.log(err);
      console.log('it errored MMMMM');
    });
  }
  // componentDidMount() {
  //   this.props.navigation.setParams({
  //     onRightPress: yourHandlerFunctionGoesHere
  //   })
  // }

  //
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
        console.log('RESPONSE EVENT', responseJson);
      } else {
        alert('invalid');
      }
    })
    .catch((err) => {
      /* do something if there was an error with fetching */
      console.log('it errored', err);
    });
  }
  // longTouchUser(lat, long) {
  // console.log('long touch user YAYAYAYAY');
  //   return fetch(`${domain}/create`, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         eventLatitude: lat,
  //         eventLongitude: long
  //       })
  //     })
  //     .then((response) => response.json())
  //     console.log('HUH2', response);
  //     console.log('this is the pin', responseJson)
  //     .then((responseJson) => {
  //       if (responseJson.success === true) {
  //         console.log('response', responseJson)
  //         console.log('LOCATION', location)
  //         Alert.alert('Your location has been pinned.')
  //       } else {
  //         alert('did not send')
  //       }
  //       console.log(responseJson)
  //     })
  //     .catch((err) => {
  //       /* do something if there was an error with fetching */
  //       console.log('it errored')
  //     });
  // }
  longTouchUser(lat, long) {
      return fetch(`${domain}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventLatitude: lat,
          eventLongitude: long
        })
      })
        .then((response) => console.log('RESPONSE HERE HERE', response))
        .then((responseJson) => {
          if (responseJson.success) {
            console.log('SUCCESSSS');
          } else {
            alert('pin not pinning');
          }
        })
        .catch((err) => {
          /* do something if there was an error with fetching */
          console.log('it errored', err);
        });
  }

  // sendLocation = async(user) => {
  //   let { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status !== 'granted') {
  //     //handle failure
  //     alert('Sorry this app cannot do cool things now.')
  //   }
  //   let location = await Location.getCurrentPositionAsync({
  //     enableHighAccuracy: true});
  //   console.log('LOCATION HERE', location)
  //   console.log('sendlatitude', location.coords.latitude)
  //   console.log('sendlongitude', location.coords.longitude)
  //   let latInt = parseInt(location.coords.latitude);
  //   let longInt = parseInt(location.coords.longitude);
  //   this.longTouchUser(latInt, longInt);
  //   console.log('kasdfksjf;slf')
  // }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => { this.props.navigation.navigate('Create'); }}
        >
            <Text style={styles.buttonLabel}>Create Event</Text>
        </TouchableOpacity> */}
        {/* <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => */}
            {/* <TouchableOpacity
                style={[styles.button, styles.buttonBlue]}
                // onPress={this.sendLocation.bind(this)}
            >
                <Text style={styles.buttonLabel}>New Pin</Text>
            </TouchableOpacity> */}
          {/* }
        /> */}
        <ListView
          style={styles.eventsContainer}
          showsVerticalScrollIndicator={false}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity style={styles.event}>
              {!rowData.eventLatitude &&
                <View>
                <Text style={styles.words}>When: {rowData.eventDate}</Text>
                <Text style={styles.words}>Where: {rowData.eventLocation}</Text>
                <Text style={styles.words}>What: {rowData.eventDescription}</Text>
                </View>}
              {/* {rowData.eventLatitude &&
                <MapView
                  style={{ flex: 7}}
                  region={{ latitude: 37.77182221974024,
                           longitude: -122.409295264717,
                           latitudeDelta: 0.1,
                           longitudeDelta: 0.05 }}
              />} */}
              {/* {rowData.eventLatitude &&
                <MapView style={{flex: 7}}
                    region={{ latitude: 37.77182221974024,
                             longitude: -122.409295264717,
                             latitudeDelta: 0.1,
                             longitudeDelta: 0.05 }}
                />} */}
            </TouchableOpacity>
          }
        />
        <BottomBarNav navigation={this.props.navigation} />
      </View>
    );
  }
}

export default MessagesScreen;
