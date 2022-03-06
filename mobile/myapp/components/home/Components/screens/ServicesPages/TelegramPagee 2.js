import React, { Component } from "react";
import { Text, StyleSheet, TextInput, TouchableOpacity, Touchable } from "react-native";
import { View , Alert, FlatList} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from 'react-redux'
import axios from 'axios';
import colors from "../../../../../charte/colors";

class TelegramPage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        isError: false,
        okIsPressed: false,
        okIsPressed_2: false,
        acti_id: 0,
        reacti_id: 0,
        action: [],
        reaction: [],
        action_params: [],
        reaction_params: [],
        service: [],
        Reaservice: [],
        ActionInput_1: "",
        ActionInput_2: "",
        ReactionInput_1: "",
        ReactionInput_2: "",
        paramsAction: [],
        paramsReaction: [],
    };
  }

  async componentDidMount() {
    const IP = this.props.ip
    const descr_service = []
    const descr_reaction = []
    const params_action = []
    const params_reaction = []
    try {
        const response = await axios.get('http://'+IP+':8080/AR/',
        {
            'headers': {'Authorization': 'Bearer  ' + this.props.accessToken}
        });
        for (let data of response.data.actions) {
          this.setState({service: data})
          if (data.id_service===this.props.clickBottom) {
            descr_service.push({label: data.description, value: data.id})
            this.setState({action: descr_service})
            if (data.params!==null) {
              params_action.push({label: data.params, id: data.id})
              this.setState({action_params: params_action})
            }
          }
        }
        for (let data of response.data.reactions) {
          this.setState({Reaservice: data})
          descr_reaction.push({label: data.description, value: data.id})
          this.setState({reaction: descr_reaction})
          if (data.params!==null) {
            params_reaction.push({label: data.params, id: data.id})
            this.setState({reaction_params: params_reaction})
          }
        }
    } catch (error) {
        this.setState({isError: true})
        Alert.alert(
            "Please enter your email and password !",
        );
    }
  }

  _display_params = () => {
    for (let data of this.state.action_params) {
      if (data.label!==undefined) {
        if(data.id===this.state.acti_id) {
          if (data.label.length===1) {
            return (
              <View style={{width: '100%', flexDirection: "row", justifyContent: 'space-between'}}>
                <View style={styles.textinput}>
                  <TextInput style={{width: "100%"}} placeholder={data.label[0]} onChangeText={(value) => {this.setState({ActionInput_1: value})}}/>
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor: colors.third}]} onPress={() => {this.setState({paramsAction: [{name: data.label[0], value: this.state.ActionInput_1}], okIsPressed: true})}}>
                  <Text style={{fontWeight: "bold"}}>OK</Text>
                </TouchableOpacity>
              </View>
            )
          }
          else if (data.label.length===2) {
            return (
              <View>
                <View style={{width: '100%', flexDirection: "row", justifyContent: 'space-between'}}>
                  <View style={styles.textinput}>
                    <TextInput style={{width: "100%"}} placeholder={data.label[0]} onChangeText={(value) => {this.setState({ActionInput_1: value})}}/>
                  </View>
                  <View style={styles.textinput}>
                    <TextInput style={{width: "100%"}} placeholder={data.label[1]} onChangeText={(value) => {this.setState({ActionInput_2: value})}}/>
                  </View>
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor: colors.third, margin: "3%"}]} onPress={() => {this.setState({paramsAction: [{name: data.label[0], value: this.state.ActionInput_1}, {name: data.label[1], value: this.state.ActionInput_2}], okIsPressed: true})}}>
                  <Text style={{fontWeight: "bold"}}>OK</Text>
                </TouchableOpacity>
              </View>
            )
          }
        }
      }
    }
    return (
      <View style={{width: '100%', flexDirection: "row", justifyContent: 'space-between'}}>
        <Text style={{margin: "2%", fontSize: 15, color: colors.third}}>No Parameter</Text>
        <TouchableOpacity style={[styles.button, {backgroundColor: colors.third}]} onPress={() => {this.setState({paramsAction: [], okIsPressed: true})}}>
         <Text style={{fontWeight: "bold"}}>OK</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _display_paramsRea = () => {
    for (let data of this.state.reaction_params) {
      if (data.label!==undefined) {
        if(data.id===this.state.reacti_id) {
          if (data.label.length===1) {
            return (
              <View style={{width: '100%', flexDirection: "row", justifyContent: 'space-between'}}>
                <View style={styles.textinput}>
                  <TextInput style={{width: "100%"}} placeholder={data.label[0]} onChangeText={(value) => {this.setState({ReactionInput_1: value})}}/>
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor: colors.third}]} onPress={() => {this.setState({paramsReaction: [{name: data.label[0], value: this.state.ReactionInput_1}], okIsPressed_2: true})}}>
                  <Text style={{fontWeight: "bold"}}>OK</Text>
                </TouchableOpacity>
              </View>
            )
          }
          else if (data.label.length===2) {
            return (
              <View>
              <View style={{width: '100%', flexDirection: "row", justifyContent: 'space-between'}}>
                <View style={styles.textinput}>
                  <TextInput style={{width: "100%"}} placeholder={data.label[0]} onChangeText={(value) => {this.setState({ReactionInput_1: value})}}/>
                </View>
                <View style={styles.textinput}>
                  <TextInput style={{width: "100%"}} placeholder={data.label[1]} onChangeText={(value) => {this.setState({ReactionInput_2: value})}}/>
                </View>
              </View>
              <TouchableOpacity style={[styles.button, {backgroundColor: colors.third, margin: "3%"}]} onPress={() => {this.setState({paramsReaction: [{name: data.label[0], value: this.state.ReactionInput_1}, {name: data.label[1], value: this.state.ReactionInput_2}], okIsPressed_2: true})}}>
                <Text style={{fontWeight: "bold"}}>OK</Text>
              </TouchableOpacity>
              </View>
            )
          }
        }
      }
    }
    return (
      <View style={{width: '100%', flexDirection: "row", justifyContent: 'space-between'}}>
        <Text style={{margin: "2%", fontSize: 15, color: colors.third}}>No Parameter</Text>
        <TouchableOpacity style={[styles.button, {backgroundColor: colors.third}]} onPress={() => {this.setState({paramsReaction: [], okIsPressed_2: true})}}>
        <Text style={{fontWeight: "bold"}}>OK</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _save = async () => {
    const IP = this.props.ip
    try {
      let body = {
        idAction: this.state.acti_id,
        idReaction: this.state.reacti_id,
        paramsAction: this.state.paramsAction,
        paramsReaction: this.state.paramsReaction
      }
      await axios.post('http://'+IP+':8080/AR/link', body,
        {
          'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
        });
        this.props.dispatch({type: 'clickBottom', value: 11});
    } catch (err) {
      this.setState({isError: true})
      Alert.alert(
        "Error, you can't save card !",
      );
    }
  }

  _displayColorButton() {
    if (this.state.okIsPressed===true && this.state.okIsPressed_2===true) {
      return (
        colors.secondary
      )
    }
    else {
      colors.third
    }
  }

  _displaySaveButton() {
    if (this.state.okIsPressed===true && this.state.okIsPressed_2===true) {
      return (
        <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.third}}>Save</Text>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name="telegram" style={styles.logo} size={90} color="#44a6c6" />
        <View style={styles.input}>
          <Text style={styles.txt_input}>Action *</Text>
          <RNPickerSelect
            style={{inputAndroid: {color: 'white'}}}
            onValueChange={(value) => this.setState({acti_id: value})}
            items={this.state.action}
          />
          {this._display_params()}
        </View>

        <View style={styles.input}>
          <Text style={styles.txt_input}>Reaction *</Text>
          <RNPickerSelect
            style={{inputAndroid: {color: 'white'}}}
            onValueChange={(value) => this.setState({reacti_id: value})}
            items={this.state.reaction}
          />
          {this._display_paramsRea()}
        </View>

        <TouchableOpacity style={[styles.button, {backgroundColor: this._displayColorButton()}]} onPress={() => {this._save()}}>
          <Text style={{fontWeight: 'bold', fontSize: 18, color: colors.third}}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    // justifyContent: 'space-between',
    margin: "3%",
  },
  logo: {
    marginBottom: "0%",
  },
  input: {
    width: "70%",
    borderRadius: 10,
    padding: "2%",
    borderWidth: 1,
    backgroundColor: "#44a6c6",
    marginBottom: "5%",
    marginTop: "3%",
  },
  textinput: {
    width: "45%",
    borderRadius: 50,
    padding: "3%",
    backgroundColor: colors.login.backg_input,
    margin: "2%"
},
  txt_input: {
    fontSize: 18,
    fontWeight: 'bold',
    width: "70%",
    color: colors.third,
    textAlign: 'left',
    marginBottom: "2%",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.secondary,
    width: "25%",
    padding: "3%"
  }
});

const mapStateToProps = (state) => {
  return {
    ip: state.ip,
    accessToken: state.accessToken,
    clickBottom: state.clickBottom
  }
}
export default connect(mapStateToProps)(TelegramPage)