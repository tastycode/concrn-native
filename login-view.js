import React, {
  Image,
  View,
  Modal,
  TextInput,
  StyleSheet,
  Component,
  Settings
} from 'react-native';

import {Ripple, Button, COLOR} from 'react-native-material-design';

export default class LoginView extends Component {
  state = {
    name: Settings.get('name'),
    phone: Settings.get('phone')
  }

  render() {
    return <Modal animated={true} style={styles.modal}>
      <View style={styles.form}>
              <Image style={styles.logo} source={require('./concrn-38.png')}/>
              <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={(text) => this.setState({name: text})}
                  value={this.state.name}
                />
              <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  onChangeText={(text) => this.setState({phone: text})}
                  value={this.state.phone}
                />
              <Button
                  onPress={this._onContinuePressed.bind(this)}
                  theme="dark"
                  text="Continue"
                />
            </View>
    </Modal>;
  }

  _onContinuePressed() {
    Settings.set(this.state);
    this.props.onContinue();
  }
}

const styles = StyleSheet.create({
  modal: {
    color: '#fff',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLOR['paperGrey300'].color,
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 5
  },
  logo: {
    width: 200,
    height: 200
  },
  button: {
   backgroundColor: '#eb1487',
   alignItems: 'center',
   justifyContent: 'center',
   height: 50
  },
  map: {
   flex: 1
  },
  container: {
    flexDirection: 'column',
    flex: 1
  },
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10

  }
});
