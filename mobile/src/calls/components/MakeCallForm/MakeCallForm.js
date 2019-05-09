import {
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import PropTypes from 'prop-types';
import { withPhoneService } from '../../providers/PhoneProvider/PhoneProvider';
import { logMessage } from '../../../common/utils/logging';
import Dialpad from './Dialpad/Dialpad';

const styles = StyleSheet.create({
  phoneNumberRow: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width - 20
  },
  phoneNumberSideColumn: {
    width: (Dimensions.get('screen').width - 20) / 7,
    alignSelf: 'center'
  },
  phoneNumberCenterColumn: {
    width: ((Dimensions.get('screen').width - 20) / 7) * 5
  },
  phoneNumberInput: {
    textAlign: 'center',
    color: 'black',
    fontSize: 30
  },
  callButtonContainer: {
    alignItems: 'center'
  },
  callButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#0fd859',
    borderRadius: 50
  }
});

export class MakeCallForm extends React.Component {
  static propTypes = {
    phoneService: PropTypes.shape({
      makeCall: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    phoneNumber: ''
  };

  /**
   * Register the user in the Telephony Backend
   */
  makeCall() {
    const { phoneNumber } = this.state;
    const { phoneService } = this.props;
    logMessage(`Calling user ${phoneNumber}`);
    phoneService.makeCall(undefined, phoneNumber);
  }

  updatePhoneNumber(newValue) {
    this.setState(state => ({
      phoneNumber: state.phoneNumber + newValue
    }));
  }

  deleteOneNumber() {
    this.setState(state => ({
      phoneNumber: state.phoneNumber.slice(0, state.phoneNumber.length - 1)
    }));
  }

  deleteWholeNumber() {
    this.setState({
      phoneNumber: ''
    });
  }

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    const { phoneNumber } = this.state;
    return (
      <View>
        <View style={styles.phoneNumberRow}>
          <View style={styles.phoneNumberSideColumn} />
          <View style={styles.phoneNumberCenterColumn}>
            <TextInput
              style={styles.phoneNumber}
              value={phoneNumber}
              editable={false}
            />
          </View>
          <View style={styles.phoneNumberSideColumn}>
            <TouchableOpacity
              onPress={() => this.deleteOneNumber()}
              onLongPress={() => this.deleteWholeNumber()}
            >
              <Icon name="backspace" />
            </TouchableOpacity>
          </View>
        </View>
        <Dialpad updatePhoneNumber={this.updatePhoneNumber} />
        <View style={styles.callButtonContainer}>
          <TouchableOpacity style={styles.callButton} onPress={this.makeCall}>
            <Icon name="phone" size={25} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default withPhoneService(MakeCallForm);
