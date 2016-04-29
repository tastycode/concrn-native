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

import {Ripple, COLOR} from 'react-native-material-design';

import Camera from 'react-native-camera';
import ModalPicker from 'react-native-modal-picker';

const urgencyValues = [
  {id: 0, label: 'Not urgent'},
  {id: 4, label: 'Within an hour'},
  {id: 5, label: 'Now'}
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
             return <Ripple>
                      <TouchableHighlight
                        key={urgencyHash.id}
                        style={styles.buttonSelect}><Text style={styles.buttonSelectText}>{urgencyHash.label.toUpperCase()}</Text>
                      </TouchableHighlight>
                    </Ripple>;

          })}
        </View>

        <Text style={styles.sectionLabel}>Gender</Text>
        <View style={styles.buttonSelects}>
          {genderValues.map((genderValue) => {
             return <Ripple>
                     <TouchableHighlight key={genderValue} style={styles.buttonSelect}>
                        <Text style={styles.buttonSelectText}>{genderValue.toUpperCase()}</Text>
                      </TouchableHighlight>
                    </Ripple>;
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
                    selectStyle={styles.select}
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
  select: {
    borderRadius: 0,
  },
  sectionLabel: {
    backgroundColor: '#eee',
    padding: 10,
    alignItems: 'flex-end'
  },
  buttonSelects: {
    flexDirection: 'row',
    padding: 10,
  },
  buttonSelect: {
    shadowColor: '#212121',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2},
    shadowRadius: 3,
    backgroundColor: COLOR['paperPink500'].color,
    flex: 1,
    padding: 10,
    margin: 5,
    elevation: 1,
  },
  buttonSelectText: {
    color: '#fff',
    textAlign: 'center'
  },
  reportFields: {
    flex: 4
  },
  container: {
    flexDirection: 'column',
    flex: 1
  }
});
