import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import MapView from 'react-native-maps';

export default class ReportMapView extends Component {
  state = {
    isFirstLoad: true,
    mapRegion: undefined,
  };

  render() {
    return <View style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChange={this._onRegionChange.bind(this)}
        onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
        region={this.state.mapRegion}
      />
    <TouchableHighlight style={styles.button} onPress={this._onReportButtonPressed.bind(this)}>
    <Text style={{color: 'white'}} >Submit Report</Text>
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
      mapRegionInput: region
    });
  }

  _onRegionChangeComplete(region) {
    if (this.state.isFirstLoad) {
      this.setState({
        mapRegionInput: region,
        isFirstLoad: false,
      });
    }
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
  map: {
   flex: 1
  },
  container: {
    flexDirection: 'column',
    flex: 1
  }
});
