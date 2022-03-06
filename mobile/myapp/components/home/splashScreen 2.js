import React, { Component } from "react";
import { Animated, Text, View, StyleSheet, TextInput, SafeAreaView, Dimensions, TouchableOpacity, Image } from "react-native";
import { connect } from 'react-redux'
import colors from "../../charte/colors";
import Login from "../auth/login";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class SplashScreen extends Component {
  constructor(props) {
    super(props);
      
    }
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  state = {
    fadeAnim: new Animated.Value(0),
    ip: ''
  };

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 5000
      }).start();
      setTimeout(()=>{
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
          }).start();
          // this.props.dispatch({type: "index", value: 0})
        }, 6000);
  }

  fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 3000
    }).start();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            {
              // Bind opacity to animated value
              opacity: this.state.fadeAnim
            }
          ]}
        >
        <View>
          <Image style={styles.img_logo} source={require("../../assets/Ulys.png")} />
        </View>
        </Animated.View>
        <Text style={styles.txt_input}>Enter your address IP</Text>
        <View style={{width: "100%", alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.input}>
            <TextInput
                placeholder="192.168.3.10"
                keyboardType="numeric"
                onChangeText={(value) => {this.setState({ip: value})}}
            ></TextInput>
          </View>
          <TouchableOpacity style={styles.btn_login} onPress={() => {this.props.dispatch({type: "ip", value: this.state.ip}), this.props.dispatch({type: "index", value: 0})}}>
            <Text style={{fontSize: 15, fontWeight: "bold", color: "white"}}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  img_logo: {
    width: 300,
    height: 300,
    marginBottom: "8%",
    marginTop: "8%",
  },
  txt_input: {
    fontSize: 18,
    marginBottom: "5%"
  },
  input: {
    width: "50%",
    borderRadius: 20,
    padding: "3%",
    marginRight: "3%",
    backgroundColor: colors.login.backg_input,
    marginBottom: "5%",
  },
  btn_login: {
    width: "20%",
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: "5%",
  },
});

const mapStateToProps = (state) => {
    return {
      index: state.index,
      ip: state.ip,
    }
}
export default connect(mapStateToProps)(SplashScreen)