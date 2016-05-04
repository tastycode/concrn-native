import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Modal,
  Text,
  Picker,
  View,
  Navigator,
  MapView,
  Dimensions,
  TouchableHighlight,
  TextInput
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
          captureTarget={Camera.constants.CaptureTarget.memory}
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
             return <Ripple key={urgencyHash.id}>
                      <TouchableHighlight
                        onPress={this._onUrgencyTouchedFn(urgencyHash).bind(this)}
                        style={this._styleForSelectedButtonWithTest( () => urgencyHash.id === this.state.urgency )}>
                          <Text style={styles.buttonSelectText}>{urgencyHash.label.toUpperCase()}</Text>
                      </TouchableHighlight>
                    </Ripple>;

          })}
        </View>

        <Text style={styles.sectionLabel}>Gender</Text>
        <View style={styles.buttonSelects}>
          {genderValues.map((genderValue) => {
             return <Ripple key={genderValue}>
                     <TouchableHighlight
                       onPress={this._onGenderTouchedFn(genderValue).bind(this)}
                       key={genderValue}
                       style={this._styleForSelectedButtonWithTest( () => genderValue === this.state.gender )}>
                        <Text style={styles.buttonSelectText}>{genderValue.toUpperCase()}</Text>
                      </TouchableHighlight>
                    </Ripple>;
          })}
        </View>
        <View style={styles.labelWithInput}>
          <Text style={styles.label}>Age</Text>
                <ModalPicker
                    selectStyle={styles.modalPickerSelect}
                    optionTextStyle={styles.modalPickerOptionText}
                    cancelStyle={styles.modalPickerCancel}
                    overlayStyle={styles.modalPickerOverlay}
                    cancelText="CANCEL"
                    data={ageValues.map((ageValue) => {
                      return {key: ageValue, label: ageValue}
                    })}
                    initValue="CHOOSE ❯"
                    onChange={({key: age})=>{ this.setState({age})}}/>
        </View>
        <View style={styles.labelWithInput}>
          <Text style={styles.label}>Ethnicity</Text>
                <ModalPicker
                    selectStyle={styles.modalPickerSelect}
                    optionTextStyle={styles.modalPickerOptionText}
                    cancelStyle={styles.modalPickerCancel}
                    overlayStyle={styles.modalPickerOverlay}
                    cancelText="CANCEL"
                    data={raceValues.map((raceValue) => {
                      return {key: raceValue, label: raceValue}
                    })}
                    initValue="CHOOSE ❯"
                    onChange={({key: race})=>{ this.setState({race})}}/>
        </View>
        <Text style={styles.sectionLabel}>Notes</Text>
        <TextInput
            style={styles.textarea}
            multiline={true}
            onChangeText={(text) => this.setState({nature: text})}
            value={this.state.nature}
          />


       </View>;
  }

  _styleForSelectedButtonWithTest(fn) {
    if (fn()) {
      return {...buttonSelectStyle, backgroundColor: COLOR['paperDeepPurple500'].color};
    } else {
      return styles.buttonSelect;
    }
  }

  _onCameraPressed() {
    if (this.state._cameraExpanded) {
      this.camera.capture()
        .then((data) => {
          this.setState({photo: data, _cameraExpanded: false});
        });
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

  _onUrgencyTouchedFn(urgencyHash) {
    return () => {
      this.setState({urgency: urgencyHash.id});
    }
  }

  _onGenderTouchedFn(genderValue) {
    return () => {
      this.setState({gender: genderValue});
   };
  }
}

const buttonSelectStyle = {
    shadowColor: '#212121',
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2},
    shadowRadius: 3,
    backgroundColor: COLOR['paperPink500'].color,
    flex: 1,
    padding: 10,
    margin: 5,
    elevation: 1
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
  buttonSelect: buttonSelectStyle,
  buttonSelectText: {
    color: '#fff',
    textAlign: 'center'
  },
  reportFields: {
    flex: 4
  },
  labelWithInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  label: {
  },
  modalPickerSelect: {
    borderWidth: 0
  },
  modalPickerOptionText: {
    textAlign: 'left'
  },
  modalPickerCancel: {
    borderRadius: 0
  },
  modalPickerOverlay: {
    borderRadius: 0
  },
  textarea: {
    height: 80,
    padding: 10
  },
  container: {
    flexDirection: 'column',
    flex: 1
  }
});
