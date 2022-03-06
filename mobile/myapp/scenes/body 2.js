import React, { Component } from "react";
import { connect } from "react-redux";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Accueil from "../components/home/home";
import SplashScreen from "../components/home/splashScreen";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.index===3) {
      return (
          <SafeAreaProvider>
            <SplashScreen/>
          </SafeAreaProvider>
      );
    }
    if (this.props.index === 0) {
      return <Login />;
    }
    else if (this.props.index === 1) {
      return <Register />;
    }
    else if (this.props.index === 2) {
      return <Accueil />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    index: state.index,
  };
};
export default connect(mapStateToProps)(Body);
