import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from 'react-native';
import BottomBarNav from '../components/BottomBarNav';
import DatePicker from '../components/DatePicker';
import styles from '../styles/styles';

class UpdateScreen extends React.Component {
  static navigationOptions = {
    title: 'Ventful',
    headerLeft: null
  };
  constructor(props) {
    super(props);
    this.state = {
        user: '',
    };
  }
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.textBig}>
            Notifications telling you about new invites from your friends and which friends are going to your events are coming soon.
          </Text>
          <BottomBarNav navigation={this.props.navigation} />
        </View>
    );
  }
}

export default UpdateScreen;
