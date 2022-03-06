import React, { Component, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { connect } from 'react-redux'
import axios from 'axios';
import Header from "./header";
import Bottom from "./bottom";
import DisplayBody from "./displayBody";

class Accueil extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ErrorMe: false,
    };
  }

  async componentDidMount() {
      const IP = this.props.ip
      this.setState({isMount: true})
      const source = axios.CancelToken.source();
      try {
          const response = await axios.get('http://'+IP+':8080/users/me',
          {
              cancelToken: source.token,
              'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
          });
          this.props.dispatch({type: "name", value: response.data.username})
      } catch (error) {
          this.setState({
              ErrorMe: true,
          })
      }
  }

  render() {
    return (
        <SafeAreaView style={{flex: 1, width: "100%"}}>
          <View style={styles.container}>
                {/* header */}
              <Header/>

              <View style={styles.body}>
                <DisplayBody/>
              </View>

              <Bottom/>
          </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  width: "100%",
  backgroundColor: '#fff',
  alignItems: 'center',
},
body: {
  height: "82%",
  width: "100%",
},
bottom: {
  width: "100%",
  height: "8%",
  flexDirection: "row",
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: "3%",
},
});

const mapStateToProps = (state) => {
  return {
  index: state.index,
  name: state.name,
  ip: state.ip,
  accessToken: state.accessToken,
  clickBottom: state.clickBottom
  }
}
export default connect(mapStateToProps)(Accueil) 