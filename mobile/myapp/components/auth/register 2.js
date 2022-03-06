import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Alert, FlatList } from 'react-native';
import { connect } from 'react-redux'
import colors from '../../charte/colors';
import axios from 'axios';

class Register extends Component{
    constructor(props) {
    super(props);
        this.state = {
            first: "", last: "", email: "", password: "", isError: false,
            isMount: false,
        };
    }

    componentDidMount() {
        this.setState({isMount: true})
    }

    async onSubmit(e) {
        e.preventDefault();
        const IP = this.props.ip
        if (this.state.isMount===true) {
            try {
                let body = {
                    email: this.state.email,
                    password: this.state.password,
                    username: this.state.first + ' ' + this.state.last,
                    firstName: this.state.first,
                    lastName: this.state.last,
                    avatar: '',
                    auth: 'local',
                }
                const response = await axios.post(
                    'http://'+IP+':8080/auth/register', body
                );
                this.setState({isError: false})
            } catch (error) {
                this.setState({isError: true})
            }
        }
        this.setState({isMount: false})
    }

    checkRegister(e) {
        this.onSubmit(e)

        if (this.state.email!=="" && this.state.password!=="" && this.state.first!=="" && this.state.last!=="") {
            if (this.state.isError===false) {
                this.props.dispatch({type: "index", value: 0})
            }
            else {
                Alert.alert(
                    "Error !",
                    "Please retry to create an account !",
                );
            }
        }
        else {
            Alert.alert(
                "Please enter all the information !",
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.img_logo}
                    source={require("../../assets/Ulys.png")}
                />
                <Text style={styles.txt_input}>FIRST NAME</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Thomas"
                        onChangeText={(value) => {this.setState({first: value})}}
                    ></TextInput>
                </View>

                <Text style={styles.txt_input}>LAST NAME</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Labro"
                        onChangeText={(value) => {this.setState({last: value})}}
                    ></TextInput>
                </View>

                <Text style={styles.txt_input}>EMAIL</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder="Area@gmail.com"
                        keyboardType="email-address"
                        onChangeText={(value) => {this.setState({email: value})}}
                    ></TextInput>
                </View>

                <Text style={styles.txt_input}>PASSWORD</Text>
                <View style={styles.input}>
                    <TextInput
                        placeholder="*******"
                        keyboardType="default"
                        secureTextEntry={true}
                        onChangeText={(value) => {this.setState({password: value})}}
                    ></TextInput>
                </View>
                <TouchableOpacity style={styles.btn_login} onPress={(e) => {this.checkRegister(e)}}>
                    <Text style={styles.txt_login}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {this.props.dispatch({type: 'index', value: 0})}}>
                    <Text style={styles.txt_register}>Sign in</Text>
                </TouchableOpacity>
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
    txt_logo: {
        fontSize: 44,
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: "20%",
    },
    img_logo: {
        width: 150,
        height: 150,
        marginBottom: "10%",
    },
    txt_input: {
        color: colors.login.txt_input,
        fontSize: 16,
        width: "55%",
        textAlign: 'left',
        marginBottom: "2%",
    },
    input: {
        width: "60%",
        borderRadius: 50,
        padding: "3%",
        backgroundColor: colors.login.backg_input,
        marginBottom: "5%",
    },
    btn_login: {
        width: "35%",
        height: "6%",
        borderRadius: 10,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: "5%",
    },
    txt_login: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textDecorationLine: "underline"
    },
    txt_register: {
        color: colors.secondary,
        fontSize: 20,
        textDecorationLine: 'underline'
    }
});

const mapStateToProps = (state) => {
    return {
    index: state.index,
    name: state.name,
    ip: state.ip,
    }
}
export default connect(mapStateToProps)(Register) 