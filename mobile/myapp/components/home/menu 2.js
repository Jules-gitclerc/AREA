import React from 'react';
import { Animated, Text, View, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../charte/colors';
import axios from 'axios';

const Navigation = [
    {id: 1, type: AntDesign, name: "twitter"},
    {id: 2, type: MaterialCommunityIcons, name: "spotify"},
    {id: 3, type: MaterialCommunityIcons, name: "discord"},
    {id: 4, type: FontAwesome, name: "twitch"},
    {id: 5, type: FontAwesome, name: "reddit"},
    {id: 6, type: FontAwesome, name: "telegram"},
	{id: 7, type: FontAwesome, name: "gamepad"},
  ]

class Display_menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			transition_menu: new Animated.Value(-200),
            services: [],
            isError: false,
		};
	}
    async componentDidMount() {
        Animated.timing(
			this.state.transition_menu,
			{ toValue: 0, duration: 500 },
		).start();

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

    _icon(item) {
        const icon = Navigation.find(icon => icon.id === item.id);
        if (item.name==="Clash Royale") {
			return (
			  <Image style={styles.profil_img} source={{uri: "https://www.freeiconspng.com/thumbs/clash-royale-png/high-resolution-clash-royale-png-icon-21.png"}}/>
			)
		  }
		  else {
			return (
			  <icon.type name={icon.name} color="white" size={30} />
			)
		  }
      }

	_navigation_color(item) {
		if (this.props.clickBottom===item.id) {
			return (
				colors.secondary
			)
		}
		else {
			return (
				"white"
			)
		}
	}

	_press_navigation(item) {
		this.props.dispatch({type: "clickBottom", value: item.id}),
		this.props.parent.setState({menu: 0})
	}

	_label_menu(item) {
        if (item.isActive===true) {
            return (
                <View style={{marginBottom: "25%"}}>
                    <TouchableOpacity style={{flexDirection: 'row', width: "100%", justifyContent: "center"}} onPress={() => {this._press_navigation(item)}}>
                        {this._icon(item)}
                        <Text style={[styles.text_navigation, {color: this._navigation_color(item)}]}>{item.name}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
	}

    _logOut() {
        this.props.dispatch({ type: "index", value: 0 })
        this.props.dispatch({ type: "accessToken", value: "" })
		this.props.dispatch({type: "clickBottom", value: 11})
    }

	render() {
		return (
			<Animated.View style={[styles.animation, {left: this.state.transition_menu}]}>
				<View style={{width: "100%"}}>

					<TouchableOpacity style={{left: 0, position: "absolute"}} onPress={() => {this.props.parent.setState({menu: 0})}}>
						<AntDesign
							name="close"
							size={50}
							color="white"
							style={{margin: "4%"}}
						/>
					</TouchableOpacity>

					<View style={styles.view_img}>
						<Image
							style={{width: 100, height: 100}}
							source={require("../../assets/Ulys.png")}
						/>
					</View>

					<View style={styles.container_labels}>
						<View style={{flex: 1, marginTop: "8%"}}>
							<FlatList
								data={this.state.services}
								keyExtractor={(item) => item.id}
								renderItem={({item}) => {  return (this._label_menu(item))  }}
							/>
						</View>
					</View>

                    <TouchableOpacity style={styles.view_logout} onPress={() => {this._logOut()}}>
                        <MaterialCommunityIcons name="logout" color={colors.secondary} size={24} />
                        <Text style={styles.txt_logout}>Logout</Text>
                    </TouchableOpacity>
					{this.props.children}
				</View>
			</Animated.View>
		);
	}
}
const styles = StyleSheet.create({
	animation: {
		shadowColor: "black",
		shadowOffset: { width: 0, height: 15, },
		shadowOpacity: 2,
		shadowRadius: 6.27,
		elevation: 30,
		backgroundColor: colors.primary,
		borderWidth: 0.32,
		borderColor: "#707070",
		position: "absolute",
		top: 0,
		width: "35%",
		height: "100%",
		alignItems: 'center',
	},
	view_img: {
		height: "20%",
		marginVertical: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container_labels: {
		height: "68%",
	},
	text_navigation: {
		fontSize: 20,
		marginLeft: "5%",
		textAlign: "center"
	},
    view_logout: {
        height: "5%",
        flexDirection: 'row',
        borderColor: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt_logout: {
        color: colors.secondary,
        fontSize: 20,
        marginLeft: "2%",
        fontWeight: 'bold'
    },
	profil_img: {
		width: 30,
		height: 30,
	},
})

const mapStateToProps = (state) => {
    return {
	  index:state.index,
      clickBottom: state.clickBottom,
      ip: state.ip,
      accessToken: state.accessToken,
    }
}
export default connect(mapStateToProps)(Display_menu)