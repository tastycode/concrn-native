import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  TouchableHighlight,
  Settings
} from 'react-native';

import MapView from 'react-native-maps';
import LoginView from './login-view';

export default class ReportMapView extends Component {
  state = {
    isFirstLoad: true,
    mapRegion: undefined,
    showLogin: !Settings.get('phone')
  };

  render() {
    return <View style={styles.container}>
      {this.state.showLogin && <LoginView onContinue={this._onLoginContinue.bind(this)}/>}
      <View style={styles.mapContainer}>
        <MapView
          ref={this.refs.map}
          style={styles.map}
          onRegionChange={this._onRegionChange.bind(this)}
          onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
          region={this.state.mapRegion}
        >
        </MapView>
        <View style={styles.pinContainer} pointerEvents="none">
          <Image source={require('./pin.png')} style={styles.pin}/>
        </View>
      </View>
      <TouchableHighlight style={styles.button} onPress={this._onReportButtonPressed.bind(this)}>
        <Text style={{color: 'white'}} >REPORT</Text>
      </TouchableHighlight>
    </View>
  }

  componentDidMount() {
   navigator.geolocation.getCurrentPosition(
      (position) => {
        let mapRegion = {
           ...position.coords,
           longitudeDelta: 0.01,
           latitudeDelta: 0.01
        }
        this.setState({mapRegion});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  _onRegionChange(region) {
    this.setState({
      mapRegion: region
    });
  }

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegion: region,
        isFirstLoad: false,
      });
    }
  }

  _onLoginContinue() {
    this.setState({showLogin: false});
  }

  _onReportButtonPressed() {
    this.props.onLocationReady(this.state.mapRegion);
  }
}
const styles = StyleSheet.create({
  button: {
   backgroundColor: '#eb1487',
   alignItems: 'center',
   justifyContent: 'center',
   height: 50
  },
  mapContainer: {
   position: 'relative',
   flex: 1
  },
  map: {
   flex: 1
  },
  pinContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pin: {
  },
  container: {
    flexDirection: 'column',
    flex: 1
  }
});
