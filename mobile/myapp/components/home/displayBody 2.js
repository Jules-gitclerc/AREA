import React, { Component, useEffect } from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { connect } from 'react-redux'

import HomeScreen from "./Components/screens/HomeScreene"
import SettingsScreen from "./Components/screens/SettingsScreen";
import ProfileScreen from "./Components/screens/Profile/ProfileScreene"
import SpotifyPage from "./Components/screens/ServicesPages/SpotifyPagee";
import TwitterPage from "./Components/screens/ServicesPages/TwitterPagee";
import TelegramPage from "./Components/screens/ServicesPages/TelegramPagee";
import TwitchPage from "./Components/screens/ServicesPages/TwitchPagee";
import RedditPage from "./Components/screens/ServicesPages/RedditPagee";
import DiscordPage from "./Components/screens/ServicesPages/DiscordPagee";
import AccountScreen from "./Components/screens/AccountScreen";
import ClashRoyalPage from "./Components/screens/ServicesPages/ClashRoyalPage";

class DisplayBody extends Component {
  constructor(props) {
    super(props);
  }

  _conditionDisplayBody() {

    if (this.props.clickBottom===10) {
        return (
          <SettingsScreen/>
        )
    }

    else if (this.props.clickBottom===9) {
      return (
        <ProfileScreen/>
      )
    }

    else if (this.props.clickBottom===11) {
      return (
        <HomeScreen/>
      )
    }

    else if (this.props.clickBottom===8) {
      return (
        <AccountScreen/>
      )
    }

    else if (this.props.clickBottom===1) {
        return (
            <TwitterPage/>
        )
    }

    else if (this.props.clickBottom===2) {
      return (
        <SpotifyPage/>
      )
    }

    else if (this.props.clickBottom===3) {
        return (
            <DiscordPage/>
        )
    }

    else if (this.props.clickBottom===4) {
        return (
            <TwitchPage/>
        )
    }

    else if (this.props.clickBottom===5) {
        return (
            <RedditPage/>
        )
    }

    else if (this.props.clickBottom===6) {
        return (
            <TelegramPage/>
        )
    }

    else if (this.props.clickBottom===7) {
      return (
        <ClashRoyalPage/>
      )
    }
  }

  render() {
    return (
        <SafeAreaView style={{flex: 1, width: "100%"}}>
            {this._conditionDisplayBody()}
        </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    clickBottom: state.clickBottom
  }
}
export default connect(mapStateToProps)(DisplayBody) 