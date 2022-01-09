import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import ARROW from '../../assets/images/arrow.png';
import AppLoading from 'expo-app-loading';
import {
	useFonts,
	Poppins_200ExtraLight,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_600SemiBold,
	Poppins_700Bold
} from '@expo-google-fonts/poppins';
const deviceWidth = Dimensions.get('screen').width;

const CarouselItem = ({ item }) => {
	let [ fontsLoaded ] = useFonts({
		Poppins_200ExtraLight,
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_700Bold
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<View style={styles.card} key={item.name}>
				<View style={styles.innerCard}>
					<View style={styles.usaWrap}>
						<Image style={styles.flag} source={{ uri: 'https://www.forex.pk/flags/USD.gif' }} />
						<Text style={styles.textCur}>1 USD</Text>
					</View>
					<View style={styles.arrow}>
						<Image source={ARROW} style={styles.arrowImg} />
					</View>
					<View style={styles.otherCurWrap}>
						<Image style={styles.flag} source={{ uri: `${item.imageUrl}` }} />
						<Text style={styles.textCur}>
							{item.rate.toString().slice(0, 5)} {item.name}
						</Text>
					</View>
				</View>
			</View>
		);
	}
};
const styles = StyleSheet.create({
	card: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: deviceWidth
	},
	innerHead: {
		fontFamily: 'Poppins_300Light',
		textAlign: 'center',
		fontSize: 25,
		color: '#fff'
	},
	innerCard: {
		marginTop: 5,
		width: deviceWidth,
		borderBottomWidth: 1,
		borderColor: '#dfdfdf',
		marginBottom: 15,
		paddingBottom: 20,
		flexDirection: 'row',
		justifyContent: 'center'
	},
	innerText: {
		fontFamily: 'Poppins_300Light',
		textAlign: 'center',
		fontSize: 22
	},
	iconImg: {
		width: 48,
		height: 48
	},
	usaWrap: {
		width: 120,
		flexDirection: 'row'
	},
	otherCurWrap: {
		width: 180,
		flexDirection: 'row'
	},
	textCur: {
		alignSelf: 'center',
		marginLeft: 10,
		fontFamily: 'Poppins_600SemiBold',
		fontSize: 18
	},
	arrow: {
		width: 50,
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center'
	},
	arrowImg: {
		alignSelf: 'center'
	},
	textSymbolCur: {
		alignSelf: 'center',
		marginLeft: 10,
		fontFamily: 'Poppins_600SemiBold',
		fontSize: 22,
		color: 'teal'
	},
	flag: {
		alignSelf: 'center',
		width: '12%',
		height: '50%',
		borderRadius: 100,
		borderWidth: 1,
		borderColor: '#000'
	}
});

export default CarouselItem;
