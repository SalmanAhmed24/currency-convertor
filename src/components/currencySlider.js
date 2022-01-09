import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Dimensions, Animated } from 'react-native';
import AppLoading from 'expo-app-loading';
import axios from 'axios';
import Indicator from './indicator';
import Edit from '../../assets/images/edit.png';
import {
	useFonts,
	Poppins_200ExtraLight,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_600SemiBold,
	Poppins_700Bold
} from '@expo-google-fonts/poppins';
import CarouselItem from './carouselItem';
import EditModal from './editModal';
import { imagesUrl } from '../../utils/constant';
const deviceWidth = Dimensions.get('screen').width;
// function starts from here
function CurrencySlider() {
	const [ allCurrencies, setAllCurrencies ] = useState('');
	const [ editModalFlag, setEditModalFlag ] = useState(false);
	const scrollX = useRef(new Animated.Value(0)).current;
	useState(() => {
		const getCurrencies = async () => {
			const currencies = await axios.get('https://v1.nocodeapi.com/salman/cx/lVpBWVwwENOXLZkv/rates');
			console.log('current', currencies.data);
			const arrCur = imagesUrl.map((i) => {
				for (const property in currencies.data.rates) {
					// console.log(`${property}: ${object[property]}`);
					return {
						name: i.country,
						imageUrl: i.imgUrl,
						rate: currencies.data.rates[i.country] == undefined ? 'none' : currencies.data.rates[i.country]
					};
				}
			});
			setAllCurrencies(arrCur);
		};
		getCurrencies();
	}, []);
	const editModalOpen = () => {
		setEditModalFlag(!editModalFlag);
	};
	const selectCurHandler = (value) => {
		console.log('pressed', value);
	};

	let [ fontsLoaded ] = useFonts({
		Poppins_200ExtraLight,
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_700Bold
	});
	if (fontsLoaded) {
		// console.log(imagesUrl);
		return (
			<View style={styles.sliderWrap}>
				{/* <TouchableOpacity onPress={() => editModalOpen()}>
					<Image source={Edit} style={styles.editImg} />
				</TouchableOpacity> */}
				<Animated.FlatList
					vertical={true}
					data={allCurrencies}
					scrollEventThrottle={32}
					onScroll={Animated.event([ { nativeEvent: { contentOffset: { x: scrollX } } } ], {
						useNativeDriver: false
					})}
					renderItem={({ item }) => <CarouselItem item={item} />}
					keyExtractor={(item) => item.name}
				/>
				<EditModal
					editFlag={editModalFlag}
					onEditModalClose={() => editModalOpen()}
					selectCurHandler={(arr) => selectCurHandler(arr)}
				/>
			</View>
		);
	} else {
		return <AppLoading />;
	}
}
const styles = StyleSheet.create({
	sliderWrap: {
		flex: 1,
		paddingTop: 25,
		paddingBottom: 25
	},
	innerHead: {
		fontFamily: 'Poppins_600SemiBold',
		textAlign: 'center',
		fontSize: 25,
		color: '#000'
	},

	innerText: {
		fontFamily: 'Poppins_300Light',
		textAlign: 'center',
		fontSize: 22
	},
	editImg: {
		alignSelf: 'flex-end',
		width: 20,
		height: 20,
		marginRight: 30
	}
});
export default CurrencySlider;
