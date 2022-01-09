import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import {
	useFonts,
	Poppins_200ExtraLight,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_600SemiBold,
	Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import CurrencySlider from './src/components/currencySlider';
import Convertor from './src/components/convertor';
export default function App() {
	let [ fontsLoaded ] = useFonts({
		Poppins_200ExtraLight,
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_700Bold
	});
	if (fontsLoaded) {
		return (
			<View style={styles.container}>
				<StatusBar style="light" />
				<Text style={styles.textCus}>Currency Convertor</Text>
				<Convertor />

				<LinearGradient
					// Button Linear Gradient
					colors={[ '#FFF', '#efefef' ]}
					style={styles.linear}
				>
					<CurrencySlider />
				</LinearGradient>
			</View>
		);
	} else {
		return <AppLoading />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000'
	},
	textCus: {
		fontFamily: 'Poppins_600SemiBold',
		color: '#fff',
		fontSize: 30,
		marginTop: 70,
		alignSelf: 'center'
	},
	linear: {
		flex: 0.65,
		borderRadius: 25,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.5,
		shadowRadius: 5,
		elevation: 20
	}
});
