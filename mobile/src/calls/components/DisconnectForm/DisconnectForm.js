import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Button} from "react-native-elements";

import {withNavigation} from 'react-navigation';
import { phoneService } from '../../providers/PhoneProvider/PhoneService';
export class DisconnectForm extends React.Component {
  static propTypes = {
    phoneService: PropTypes.object.isRequired
  };

  /**
   * Register the user in the Telephony Backend
   */
  disconnectUserAction = async () => {
    // const { phoneNumber } = this.state;
    const { phoneService, navigation } = this.props;
    console.log(`Disconnecting user`);
    await phoneService.disconnectUser();
    navigation.navigate("UnRegisterLoading");
  };

  /**
   * Render the component
   * @returns {*}
   */
  render() {
    this.props.phoneService.testFunction();
    return (
      <View>
        <Button
          onPress={this.disconnectUserAction}
          title="Disconnect"
          type="clear"
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    marginBottom: 10,
  },
  buttonTitle: {
    color: "#FF0000"
  }
});

export default withNavigation(phoneService(DisconnectForm));
