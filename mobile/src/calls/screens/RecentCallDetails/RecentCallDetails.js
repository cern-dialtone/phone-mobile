import React, { Component } from 'react';
import { Button, Icon, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10
  },
  button: {
    marginTop: 10,
    marginBottom: 10
  },
  icon: {
    display: 'flex'
  },
  iconTextContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconItem: {
    flex: 0.3,
    height: 40,
    width: 40,
    backgroundColor: '#FFF000'
  }
});

class RecentCallDetails extends Component {
  render() {
    const { recentCall } = this.props.navigation.state.params;
    let printableDate;
    let duration;
    if (recentCall.startTime) {
      printableDate = moment(recentCall.startTime).calendar();
      duration = moment.duration(
        moment(recentCall.endTime).diff(moment(recentCall.startTime))
      );
    }

    const missedColor = recentCall.missed ? 'red' : 'green';

    const iconName = recentCall.incoming ? 'arrow-downward' : 'arrow-upward';

    return (
      <View style={styles.container}>
        <View style={[styles.iconTextContainer]}>
          <Icon name="phone" size={40} />
          <Text h2>{recentCall.phoneNumber}</Text>
        </View>
        <View style={[styles.iconTextContainer]}>
          <Icon name="clock" type="evilicon" size={40} />
          <Icon name={iconName} color={missedColor} type="ionicons" size={20} />
          <Text>{duration ? duration.humanize() : ''}</Text>
        </View>
        <View style={[styles.iconTextContainer]}>
          <Icon name="calendar" type="evilicon" size={40} />
          <Text>{printableDate}</Text>
        </View>
        <Button
          icon={<Icon name="phone" color="white" />}
          iconLeft
          title="Call this number"
          buttonStyle={[styles.button]}
        />
      </View>
    );
  }
}

export default RecentCallDetails;