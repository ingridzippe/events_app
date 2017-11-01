import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/styles';

class BottomBarNav extends React.Component {
  static navigationOptions = {
    title: 'BottomBarNav',
    header: null
  };
  render() {
    return (
        <View style={styles.bottombar}>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { this.props.navigation.navigate('Messages'); }}
          >
            <Icon name='home' style={{ fontSize: 30, color: '#333333' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { console.log('in to', this.props.navigation) }}
          >
            <Icon name='search' style={{ fontSize: 22, marginTop: 4, color: '#333333' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { this.props.navigation.navigate('Create'); }}
          >
            <Icon name='plus-square-o' style={{ fontSize: 30, marginTop: 1, color: '#333333' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { this.props.navigation.navigate('Messages'); }}
          >
            <Icon name='heart-o' style={{ fontSize: 25, marginTop: 2, color: '#333333' }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.bottombaritem]}
            onPress={() => { this.props.navigation.navigate('MyProfile'); }}
          >
            <Icon name='user-o' style={{ fontSize: 24, marginTop: 3, color: '#333333' }} />
          </TouchableOpacity>
        </View>
    );
  }
}

export default BottomBarNav;
