
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import ReportMapView from './report-map-view';
import ReportCreateView from './report-create-view';

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if(index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>)
    }
    else { return null }
  },
  RightButton(route, navigator, index, navState) {
    if (route.onPress) return (
      <TouchableHighlight
         onPress={ () => route.onPress() }>
         <Text style={ styles.rightNavButtonText }>
              { route.rightText || 'Right Button' }
         </Text>
       </TouchableHighlight>)
  },
  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>{route.name}</Text>
  }
}

export default class Main extends Component {
  renderScene(route, navigator) {
     if(route.name == 'Map') {
        return <ReportMapView onLocationReady={this._onLocationReadyFn(navigator).bind(this)}></ReportMapView>
     } else if (route.name === 'Report') {
        return <ReportCreateView onReportReady={this._onReportEntryFinishedFn(navigator).bind(this)}></ReportCreateView>
     }
  }
  navigationBar() {
   return <Navigator.NavigationBar 
      style={ styles.nav } 
      routeMapper={ NavigationBarRouteMapper } />
  }

  render() {
    return (
      <Navigator
  style={{flex: 1}}
  navigationBar={this.navigationBar()}
  initialRoute={this.routes.main}
  renderScene={ this.renderScene.bind(this) } />
    );
  }

  _onReportEntryFinishedFn(navigator) {
    return (reportData) => {
      alert(JSON.stringify(reportData));
      navigator.pop();
    }
  }

  _onLocationReadyFn(navigator) {
    return (mapRegion) => {
       navigator.push({
         ...this.routes.report,
         ...mapRegion
       });
    }
  }

  routes = {
    main: {
      name: 'Map'
    },
    report: {
      name: 'Report'
    }
  }

}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  container: {},
});
