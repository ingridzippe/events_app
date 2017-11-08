import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ListView,
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
// import BottomBar from '../components/BottomBar';
import styles from '../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { StackNavigator } from 'react-navigation';
// import { ImagePicker, Location, Permissions, MapView } from 'expo';

const domain = 'https://something-horizons.herokuapp.com';

class MyProfileScreen extends React.Component {
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
    fetch('http://localhost:3000/myevents')
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
        <View style={{ flexDirection: 'row' }}>
          <View style={{
            borderWidth: 0.5,
            borderRadius: 50,
            borderColor: '#696969',
            width: 75,
            height: 75,
          }}></View>
          <View style={{ height: 120, flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
              <View style={{flex: 1, flexDirection: 'column', width: 200}}>
                  <View style={{ flex: 1, width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>1,000</Text>
                      <Text>380</Text>
                      <Text>400</Text>
                  </View>
                  <View style={{ flex: 1, width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>events</Text>
                      <Text>followers</Text>
                      <Text>following</Text>
                  </View>
              </View>
              <View style={{ flex: 1, width: 200, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity>
                    <Text style={{
                      textAlign: 'center',
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                      height: 29,
                      width: 200,
                      padding: 5,
                      margin: 6,
                      borderWidth: 0.8,
                      fontFamily: 'AvenirNext-Regular',
                      borderRadius: 7,
                      borderColor: '#A9A9A9',
                    }}>Edit Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity >
                    <Icon
                      name='cog'
                      style={{ marginTop: 5, marginLeft: 3, fontSize: 30, color: '#808080' }} />
                  </TouchableOpacity>
              </View>
          </View>
        </View>
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
        <BottomBarNav navigation={this.props.navigation} />
      </View>
    );
  }
}

export default MyProfileScreen;
