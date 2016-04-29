import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  Picker,
  View,
  Navigator,
  MapView,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Camera from 'react-native-camera';
import ModalPicker from 'react-native-modal-picker';

const urgencyValues = [
  {id: 0, label: 'Not urgent'},
  {id: 4, label: 'Within an hour'},
  {id: 5, label: 'Need help now'}
];
const genderValues = ['Male', 'Female', 'Other'];
const ageValues = ['Youth (0-17)', 'Young Adult (18-34)', 'Adult (35-64)', 'Senior (65+)'];
const raceValues = ['Hispanic or Latino',
                      'American Indian or Alaska Native',
                      'Asian',
                      'Black or African American',
                      'Native Hawaiian or Pacific Islander',
                      'White',
                      'Other/Unknown'];

export default class ReportCreateView extends Component {
  state = {_cameraExpanded: false};

  render() {
    return <View style={styles.container}>
       <View
         style={styles.form}
       >
        <View style={{height: 50}}></View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          captureTarget={Camera.constants.CaptureTarget.disk}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          {this.state._cameraExpanded && (() => {
            return <TouchableHighlight onPress={this._toggleReportFieldsVisible.bind(this)}><Text style={styles.capture}>[CANCEL]</Text></TouchableHighlight>
          })()}
            <TouchableHighlight>
              <Text style={styles.capture} onPress={this._onCameraPressed.bind(this)}>[CAPTURE]</Text>
            </TouchableHighlight>
        </Camera>
        {!this.state._cameraExpanded && this._reportFields()}
       </View>
       {!this.state._cameraExpanded && (() => {
         return <TouchableHighlight style={styles.button} onPress={this._onReportButtonPressed.bind(this)}>
           <Text style={{color: 'white'}} >Submit Report</Text>
         </TouchableHighlight>
       })()}
     </View>
  }

  _reportFields() {
    return <View style={styles.reportFields}>
        <Text style={styles.sectionLabel}>Urgency</Text>
        <View style={styles.buttonSelects}>
          {urgencyValues.map((urgencyHash) => {
             return <TouchableHighlight key={urgencyHash.id} style={styles.buttonSelect}><Text>{urgencyHash.label}</Text></TouchableHighlight>;
          })}
        </View>

        <Text style={styles.sectionLabel}>Gender</Text>
        <View style={styles.buttonSelects}>
          {genderValues.map((genderValue) => {
             return <TouchableHighlight key={genderValue} style={styles.buttonSelect}>
                      <Text>{genderValue}</Text>
                    </TouchableHighlight>;
          })}
        </View>
        <View style={styles.labelWithInput}>
          <Text style={styles.label}>Age</Text>
                <ModalPicker
                    data={ageValues.map((ageValue) => {
                      return {key: ageValue, label: ageValue}
                    })}
                    initValue="Choose..."
                    onChange={(option)=>{ this.setState({age: option})}}/>
        </View>
        <View style={styles.labelWithInput}>
          <Text style={styles.label}>Ethnicity</Text>
                <ModalPicker
                    data={raceValues.map((raceValue) => {
                      return {key: raceValue, label: raceValue}
                    })}
                    initValue="Choose..."
                    onChange={(option)=>{ this.setState({race: option})}}/>
        </View>
       </View>;
  }

  _onCameraPressed() {
    if (this.state._cameraExpanded) {
      this.camera.capture()
        .then((data) => alert(data));
    } else {
      this._toggleReportFieldsVisible();
    }
  }

  _toggleReportFieldsVisible() {
   this.setState({_cameraExpanded: !this.state._cameraExpanded});
  }

  _onReportButtonPressed() {
     this.props.onReportReady(this.state);
  }
}
const styles = StyleSheet.create({
  button: {
   backgroundColor: '#eb1487',
   alignItems: 'center',
   justifyContent: 'center',
   height: 50
  },
  form: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  sectionLabel: {
    backgroundColor: '#eee',
    padding: 10,
    alignItems: 'flex-end'
  },
  buttonSelects: {
    padding: 10
  },
  buttonSelect: {
    padding: 5,
    backgroundColor: '#f0f'
  },
  reportFields: {
    flex: 4
  },
  container: {
    flexDirection: 'column',
    flex: 1
  }
});
