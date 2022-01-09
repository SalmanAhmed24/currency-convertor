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
const EditModal = ({ editFlag, currencies, onEditModalClose, selectCurHandler }) => {
	let [ fontsLoaded ] = useFonts({
		Poppins_200ExtraLight,
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_700Bold
	});
	console.log('currencies', currencies);
	if (fontsLoaded) {
		return (
			<Modal animationType="slide" transparent={true} visible={editFlag}>
				<View style={styles.centeredEditView}>
					<View style={styles.modalView}>
						<View style={styles.mainEditWrap}>
							<Text style={styles.resultText} onPress={() => selectCurHandler(1)}>
								edit Modal
							</Text>
							<Text onPress={() => onEditModalClose()} style={styles.close}>
								Close
							</Text>
						</View>
					</View>
				</View>
			</Modal>
		);
	} else {
		return <AppLoading />;
	}
};

const styles = StyleSheet.create({
	centeredEditView: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		width: width,
		height: height
	},
	mainEditWrap: {
		width: width / 1.1,
		padding: 20,
		borderRadius: 20,
		backgroundColor: '#fff',
		shadowColor: '#fff',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	modalView: {
		margin: 20,
		width: width,
		height: height,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.7)',
		padding: 35,
		alignItems: 'center'
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

export default EditModal;
