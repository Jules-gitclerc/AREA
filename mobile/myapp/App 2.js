import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View, SafeAreaView} from 'react-native';
import Store from './store/configureStore'
import { Provider } from 'react-redux'
import Body from './scenes/body';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <SafeAreaView style={styles.container}>
          <Provider store={Store}>
              <StatusBar style="auto" />
              <Body/>
          </Provider>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 