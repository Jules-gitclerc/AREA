import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Dimensions, SafeAreaView, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../charte/colors';

const bottomBar = [
    {id: 11, label: "Home", typicon: FontAwesome5, namicon: "home"},
    {id: 10, label: "Service Settings", typicon: Ionicons, namicon: "settings"},
    {id: 9, label: "Profil", typicon: Ionicons, namicon: "person"},
    {id: 8, label: "Manage Account", typicon: MaterialCommunityIcons, namicon: "account-cog"},
];

class Bottom extends Component{
    constructor(props) {
		super(props);
        this.state = {
          clickBottom: 2,
        };
    }

    _activeColorBottom(item) {
      if (this.props.clickBottom===item.id) {
        return (colors.secondary)
      }
      else {
        return ("white")
      }
    }

    render() {
        return (
            <View style={styles.bottom}>
                <FlatList
                    data={bottomBar}
                    numColumns={bottomBar.length}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => { return (
                    <TouchableOpacity style={{alignItems: 'center', width: "25%"}} onPress={() => {this.props.dispatch({type: 'clickBottom', value: item.id});}}>
                        <item.typicon name={item.namicon} color={this._activeColorBottom(item)} size={24} />
                        <Text style={{color: this._activeColorBottom(item), fontWeight: 'bold', fontSize: 12}}>{item.label}</Text>
                    </TouchableOpacity>
                    )  }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bottom: {
      width: "100%",
      height: "8%",
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: "3%",
      backgroundColor: colors.primary
    },
  });

  const mapStateToProps = (state) => {
    return {
      index: state.index,
      clickBottom: state.clickBottom,
    }
}
export default connect(mapStateToProps)(Bottom)