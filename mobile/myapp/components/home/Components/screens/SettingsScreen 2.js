import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Linking, Image} from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import axios from 'axios';
import { WebView } from 'react-native-webview';

const Icon = [
  {id: 1, type: AntDesign, name: "twitter"},
  {id: 2, type: MaterialCommunityIcons, name: "spotify"},
  {id: 3, type: MaterialCommunityIcons, name: "discord"},
  {id: 4, type: FontAwesome, name: "twitch"},
  {id: 5, type: FontAwesome, name: "reddit"},
  {id: 6, type: FontAwesome, name: "telegram"},
  {id: 7, type: FontAwesome, name: "gamepad"},
]

class ServiceSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      isError: false,
    };
  }

  async componentDidMount() {
    const IP = this.props.ip
    const source = axios.CancelToken.source();
    try {
      const response = await axios.get('http://'+IP+':8080/services',
      {
        cancelToken: source.token,
        'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
      });
      this.setState({services: response.data})
    } catch (error) {
      this.setState({
        isError: true,
      })
    }
  }

  _onPressCard = async(item) => {
    const IP = this.props.ip
    item.isActive = !item.isActive;
    this.setState({services: [...this.state.services]})
    const source = axios.CancelToken.source();
    if (item.name==="Twitter" && item.isActive===true) {
      const supported = await Linking.canOpenURL('https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YXVaTlVPUGJrYnBPcGJrdERwTFI6MTpjaQ&redirect_uri=http://localhost:8081/App/TwitterRedirect&scope=offline.access%20tweet.read%20tweet.write%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain');
      if (supported) {
        await Linking.openURL('https://twitter.com/i/oauth2/authorize?response_type=code&client_id=YXVaTlVPUGJrYnBPcGJrdERwTFI6MTpjaQ&redirect_uri=http://localhost:8081/App/TwitterRedirect&scope=offline.access%20tweet.read%20tweet.write%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain');
        try {
          let body = {
            action: item.isActive ? 'sub' : 'unsub',
            serviceId: item.id
          };
          await axios.post('http://'+IP+':8080/services/subscribe', body,
          {
            cancelToken: source.token,
            'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
          });
        } catch (error) {
          this.setState({
            isError: true,
          })
        }
      }
    }
    else if (item.name==="Spotify" && item.isActive===true) {
      const supported = await Linking.canOpenURL('https://accounts.spotify.com/authorize?response_type=code&client_id=187c0fc794714871bbe61948b5232d56&scope=user-read-private%20user-read-email%20user-library-read%20user-read-playback-state%20user-modify-playback-state&redirect_uri=http://localhost:8081/App/SpotifyRedirect&state=generateRandomString(16)');
      if (supported) {
        await Linking.openURL('https://accounts.spotify.com/authorize?response_type=code&client_id=187c0fc794714871bbe61948b5232d56&scope=user-read-private%20user-read-email%20user-library-read%20user-read-playback-state%20user-modify-playback-state&redirect_uri=http://localhost:8081/App/SpotifyRedirect&state=generateRandomString(16)');
        try {
          let body = {
            action: item.isActive ? 'sub' : 'unsub',
            serviceId: item.id
          };
          await axios.post('http://'+IP+':8080/services/subscribe', body,
          {
            cancelToken: source.token,
            'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
          });
        } catch (error) {
          this.setState({
            isError: true,
          })
        }
      }
    }
    else if (item.name==="Reddit" && item.isActive===true) {
      const supported = await Linking.canOpenURL('https://www.reddit.com/api/v1/authorize?client_id=A1dJ6sEJqHjO27RHN4pwTw&response_type=code&state=generateRandomString(16)&redirect_uri=http://localhost:8081/App/RedditRedirect&duration=temporary&scope=identity');
      if (supported) {
        await Linking.openURL('https://www.reddit.com/api/v1/authorize?client_id=A1dJ6sEJqHjO27RHN4pwTw&response_type=code&state=generateRandomString(16)&redirect_uri=http://localhost:8081/App/RedditRedirect&duration=temporary&scope=identity');
        try {
          let body = {
            action: item.isActive ? 'sub' : 'unsub',
            serviceId: item.id
          };
          await axios.post('http://'+IP+':8080/services/subscribe', body,
          {
            cancelToken: source.token,
            'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
          });
        } catch (error) {
          this.setState({
            isError: true,
          })
        }
      }
    }
    else {
      try {
        let body = {
          action: item.isActive ? 'sub' : 'unsub',
          serviceId: item.id
        };
        await axios.post('http://'+IP+':8080/services/subscribe', body,
        {
          cancelToken: source.token,
          'headers': {'Authorization': 'Bearer  '+this.props.accessToken}
        });
      } catch (error) {
        this.setState({
          isError: true,
        })
      }
    }
  }
  
  _icon(item) {
    const icon = Icon.find(icon => icon.id === item.id);
    if (item.name==="Clash Royale") {
      return (
        <Image style={styles.profil_img} source={{uri: "https://www.freeiconspng.com/thumbs/clash-royale-png/high-resolution-clash-royale-png-icon-21.png"}}/>
      )
    }
    else {
      return (
        <icon.type name={icon.name} color="white" size={42} />
      )
    }
  }

  _backg(item) {
    if (item.isActive===false) {
      return ("grey")
    }
    else {
      return (item.color)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.services}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {  return (
              <TouchableOpacity style={[styles.view_card, {backgroundColor: this._backg(item)}]} onPress={() => {this._onPressCard(item)}}>
                {this._icon(item)}
                <Text style={styles.txt_name}>{item.name}</Text>
              </TouchableOpacity>
          )  }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "4%",
    alignItems: "center",
    justifyContent: "center",
  },
  view_card: {
    width: "45%",
    height: 180,
    margin: "2%",
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: "2%"
  },
  txt_name: {
    fontSize: 24, 
    fontWeight: "bold",
    color: "white",
    marginTop: "10%"
  },
  profil_img: {
    width: 50,
    height: 50,
  },
});

const mapStateToProps = (state) => {
  return {
  index: state.index,
  accessToken: state.accessToken,
  ip: state.ip
  }
};

export default connect(mapStateToProps)(ServiceSettings) 