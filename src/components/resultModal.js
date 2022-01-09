import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import {
	useFonts,
	Poppins_200ExtraLight,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_600SemiBold,
	Poppins_700Bold
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

const { width, height } = Dimensions.get('screen');
const ResultModal = ({ resultFlag, result, onResultClose }) => {
	let [ fontsLoaded ] = useFonts({
		Poppins_200ExtraLight,
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_700Bold
	});
	if (fontsLoaded) {
		return (
			<View style={styles.centeredView}>
				<Modal animationType="fade" transparent={true} visible={resultFlag}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.resultText}>{result}</Text>
							<Text onPress={() => onResultClose()} style={styles.close}>
								Close
							</Text>
						</View>
					</View>
				</Modal>
			</View>
		);
	} else {
		return <AppLoading />;
	}
};

const styles = StyleSheet.create({
	centeredView: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22
	},
	modalView: {
		margin: 20,
		width: width / 1.1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	resultText: {
		fontSize: 22,
		fontFamily: 'Poppins_300Light'
	},
	close: {
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Poppins_400Regular',
		color: '#000',
		borderWidth: 1,
		borderRadius: 10,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 0,
		paddingTop: 5,
		marginTop: 20
	}
});

export default ResultModal;
