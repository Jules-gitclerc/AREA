import {React, Component} from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, TextInput } from "react-native";
import colors from "../../../../../charte/colors";
import { connect } from 'react-redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

class UpdatePwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", password: "", firstName: "", lastName: "", username: "", conf_pwd: "",
    };
  }

  async _changePassword() {
    const IP = this.props.ip
    const source = axios.CancelToken.source();
    try {
      let body = {
          lastPassword: this.state.password,
          newPassword: this.state.conf_pwd,
      }
      const response = await axios.put('http://'+IP+':8080/users/password', body,
      {
        cancelToken: source.token,
        'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
      });
      if (response.status!==200) {
        Alert.alert(
            "Can't update your password !",
            "Your last password is incorrect !",
        );
    }
    else {
        this.props.parent.setState({hide_pwd: true})
    }
    } catch (err) {
        if (err.response) {
            this.props.parent.setState({isError: true})
        }
    }
  }

  _cancelPress() {
    this.props.parent.setState({hide_pwd: true})
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header_popup}>
            <Text style={{color: "white", fontWeight: "500", fontSize: 24}}>Update profil</Text>
          </View>
          <View style={styles.container}>
              <Text style={styles.txt_input}>LAST PASSWORD</Text>
              <View style={styles.input}>
                <TextInput
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(value) => {this.setState({password: value})}}
                ></TextInput>
              </View>

              <Text style={styles.txt_input}>NEW PASSWORD</Text>
              <View style={styles.input}>
                <TextInput
                    secureTextEntry={true}
                    value={this.state.conf_pwd}
                    onChangeText={(value) => {this.setState({conf_pwd: value})}}
                ></TextInput>
              </View>
              
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '5%', width: "100%", height: "20%"}}>
                <TouchableOpacity style={styles.btn_login} onPress={() => {this._changePassword()}}>
                    <MaterialIcons style={{marginRight: "5%"}} name="save" color="white" size={18} />
                    <Text style={styles.txt_popup}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn_login, {backgroundColor: colors.primary}]} onPress={() => {this._cancelPress()}}>
                    <MaterialIcons style={{marginRight: "5%"}} name="cancel" color="white" size={18} />
                    <Text style={styles.txt_popup}>Cancel</Text>
                </TouchableOpacity>
              </View>
          </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  txt_input: {
    color: colors.login.txt_input,
    fontSize: 14,
    width: "65%",
    textAlign: 'left',
    marginTop: "2%",
  },
  input: {
      width: "70%",
      borderRadius: 15,
      padding: "2%",
      backgroundColor: colors.login.backg_input,
      marginTop: "2%",
  },
  btn_login: {
    width: "25%",
    height: "100%",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    margin: "2%"
  },
  txt_popup: {
    fontSize: 15,
    color: 'white',
    fontWeight: "500"
  },
  header_popup: {
      height: "25%",
      borderWidth: 0,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      width: "100%",
      backgroundColor: colors.secondary,
      alignItems: 'center',
      justifyContent: 'center'
    }
});

const mapStateToProps = (state) => {
  return {
  index: state.index,
  accessToken: state.accessToken,
  ip: state.ip
  }
}
export default connect(mapStateToProps)(UpdatePwd)