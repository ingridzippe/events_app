import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
} from 'react-native';
// import BottomBar from '../components/BottomBar';
import styles from '../styles/styles';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

const domain = 'https://something-horizons.herokuapp.com';

class MyProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'MyProfile' //you put the title you want to be displayed here
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
    fetch(`${domain}/events`)
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
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => { this.props.navigation.navigate('Create'); }}
        >
            <Text style={styles.buttonLabel}>User headshot</Text>
        </TouchableOpacity>
        {/* <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => */}
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
        {/* <BottomBar navigation={this.props.navigation} /> */}
      </View>
    );
  }
}

export default MyProfileScreen;
