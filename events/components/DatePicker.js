import React from 'react';
import {
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

class DatePicker extends React.Component {
  constructor(props, defaultProps) {
    super(props, defaultProps);
    this.state = {
      date: new Date(),
    };
  }
  static defaultProps = {
    // return {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    // };
  }
  getInitialState() {
    return {
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    };
  }
  onDateChange(date) {
    // this.setState({date: date});
    this.setState({date: date});
    this.props.events.emit('date-picked', date);
  }
  render() {
    return (
      <View>
        <DatePickerIOS
          date={this.state.date}
          mode="time"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
          minuteInterval={10}
        />
        <DatePickerIOS
            date={this.state.date}
            mode="time"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
            minuteInterval={10}
        />
      </View>
    )
  }
}

export default DatePicker;
