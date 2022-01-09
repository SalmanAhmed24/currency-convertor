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
const ModalSelect = ({ onSelect, modalFlag, data, onFromSelect, curFlag }) => {
	let [ fontsLoaded ] = useFonts({
		Poppins_200ExtraLight,
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_700Bold
	});
	if (fontsLoaded) {
		return (
			<Modal animationType="fade" transparent={true} visible={modalFlag}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.mainEditWrap}>
							<Pressable style={styles.buttonClose} onPress={(flag = null) => onSelect(flag)}>
								<Text style={styles.textStyle}>X</Text>
							</Pressable>
							{data && data.length ? (
								<FlatList
									data={data}
									keyExtractor={(item) => item.value}
									renderItem={({ item }) => {
										return (
											<Text onPress={() => onFromSelect(item, curFlag)} style={styles.options}>
												{item.value} {item.label}
											</Text>
										);
									}}
								/>
							) : (
								<ActivityIndicator size="large" color="#00ff00" />
							)}
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
	centeredView: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
		width: width,
		height: height
	},
	mainEditWrap: {
		width: width / 1.1,
		padding: 20,
		height: height / 1.2,
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
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: '#F194FF'
	},
	buttonClose: {
		width: 25,
		height: 25,
		borderRadius: 25,
		alignSelf: 'flex-end',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#2196F3'
	},
	textStyle: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
		fontFamily: 'Poppins_300Light'
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontFamily: 'Poppins_300Light'
	},
	options: {
		borderBottomWidth: 1,
		fontFamily: 'Poppins_300Light',
		fontSize: 18,
		borderColor: '#efefef',
		marginBottom: 10
	}
});

export default ModalSelect;
