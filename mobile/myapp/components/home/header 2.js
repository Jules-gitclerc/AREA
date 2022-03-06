import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Display_menu from "./menu"
import colors from '../../charte/colors';
import { connect } from 'react-redux'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state={
            menu: 0,
        }
    }

    _menu() {
        if (this.state.menu === 1) {
            return (
                <Modal transparent={true}>
                    <Display_menu parent={this}/>
                </Modal>
            );
        }
    }
  
    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity onPress={() => {this.setState({menu: 1})}} style={styles.menu_bar}>
                    <MaterialCommunityIcons
                        name="menu"
                        color={colors.secondary}
                        size={30}
                    />
                </TouchableOpacity>

                <View style={{height: 40, justifyContent: 'center', marginLeft: "5%"}}>
                    <Text style={{fontWeight: 'bold', color: colors.secondary, fontSize: 22}}>ULYS</Text>
                </View>

                <View style={{height: 40, justifyContent: 'center', right: 0, position: 'absolute', marginRight: "3%"}}>
                    <Text style={styles.txt_welcome}>WELCOME: {this.props.name}</Text>
                </View>
          
                {this._menu()}

            </View>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        height: "8%",
        width: '100%',
        borderWidth: 0.32,
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 15,
        },
        shadowOpacity: 2,
        shadowRadius: 6.27,
        elevation: 30,
    },
    menu_bar: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "white",
        borderRadius: 5,
        width: 30,
        height: 30,
    },
    txt_welcome: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
})

const mapStateToProps = (state) => {
    return {
	  name: state.name
    }
}
export default connect(mapStateToProps)(Header)