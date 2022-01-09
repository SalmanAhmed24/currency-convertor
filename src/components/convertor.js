import React, { useState, useEffect } from 'react';
import {
	Text,
	StyleSheet,
	View,
	Dimensions,
	ActivityIndicator,
	KeyboardAvoidingView,
	TouchableOpacity,
	TextInput,
	ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import ModalSelect from './selectModal';
const { width } = Dimensions.get('screen');
import {
	useFonts,
	Poppins_200ExtraLight,
	Poppins_300Light,
	Poppins_400Regular,
	Poppins_600SemiBold,
	Poppins_700Bold
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import ResultModal from './resultModal';
function Convertor() {
	const [ allCurName, setAllCurName ] = useState();
	const [ fromValue, setFromValue ] = useState({ label: '', value: '' });
	const [ toValue, setToValue ] = useState({ label: '', value: '' });
	const [ modalVisible, setModalVisible ] = useState(false);
	const [ curflag, setCurflag ] = useState(null);
	const [ amount, setAmount ] = useState('1');
	const [ result, setResult ] = useState('');
	const [ resultFlag, setResultFlag ] = useState(false);
	let [ fontsLoaded ] = useFonts({
		Poppins_200ExtraLight,
		Poppins_300Light,
		Poppins_400Regular,
		Poppins_600SemiBold,
		Poppins_700Bold
	});
	useEffect(() => {
		const fetchCur = async function() {
			const options = {
				method: 'GET',
				url: 'https://raw.githubusercontent.com/mhs/world-currencies/master/currencies.json'
			};

			const result = await axios.request(options);
			const curOpt = result.data.map((i) => {
				return { label: i.name, value: i.cc };
			});
			setAllCurName(curOpt);
		};
		fetchCur();
	}, []);
	const onSelectModal = () => {
		setModalVisible(!modalVisible);
	};
	const fromSelectHandler = (flag) => {
		setCurflag(flag);
		setModalVisible(!modalVisible);
	};
	const toSelectHandler = (flag) => {
		setCurflag(flag);
		setModalVisible(!modalVisible);
	};
	const onFromSelect = (value) => {
		if (curflag == 'from') {
			setFromValue(value);
			setModalVisible(!modalVisible);
		} else if (curflag == 'to') {
			setToValue(value);
			setModalVisible(!modalVisible);
		} else {
			setModalVisible(!modalVisible);
		}
	};
	const resultModalHandler = () => {
		setResultFlag(!resultFlag);
	};
	const calculateHandler = () => {
		axios
			.get(
				`https://v1.nocodeapi.com/salman/cx/lVpBWVwwENOXLZkv/rates/convert?amount=${Number(
					amount
				)}&from=${fromValue.value}&to=${toValue.value}`
			)
			.then((res) => {
				console.log('@@@', res.data.text);
				setResult(res.data.text);
				resultModalHandler();
			})
			.catch((err) => console.log(err));
	};
	if (fontsLoaded) {
		return (
			<View style={styles.container}>
				<View style={styles.fromToWrap}>
					<View style={styles.fromCon}>
						<Text style={styles.head}>From</Text>
						<Text onPress={() => fromSelectHandler('from')} style={styles.inputfrom}>
							{fromValue.value == '' ? 'Select Currency' : `${fromValue.value} (${fromValue.label})`}
						</Text>
					</View>
					<View style={styles.fromCon}>
						<Text style={styles.head}>To</Text>
						<Text onPress={() => toSelectHandler('to')} style={styles.inputfrom}>
							{toValue.value == '' ? 'Select Currency' : `${toValue.value} (${toValue.label})`}
						</Text>
					</View>
				</View>
				<Text style={styles.headAmount}>Amount</Text>
				<TextInput
					value={amount}
					style={styles.input}
					onChangeText={setAmount}
					placeholder="Enter Amount"
					keyboardType="numeric"
				/>
				<TouchableOpacity
					disabled={fromValue.value == '' && toValue.value == '' ? true : null}
					onPress={() => calculateHandler()}
					style={styles.btnWrap}
				>
					<Text style={fromValue.value !== '' && toValue.value !== '' ? styles.btnCal : styles.btnDisable}>
						Calculate
					</Text>
				</TouchableOpacity>
				<ModalSelect
					onFromSelect={(value) => onFromSelect(value)}
					data={allCurName}
					modalFlag={modalVisible}
					onSelect={() => onSelectModal()}
				/>
				<ResultModal onResultClose={() => resultModalHandler()} resultFlag={resultFlag} result={result} />
			</View>
		);
	} else {
		return <ActivityIndicator size="large" color="#00ff00" />;
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 0.35,
		width: width,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20
	},
	fromToWrap: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	fromCon: {
		width: 185
	},
	head: {
		marginTop: 10,
		paddingLeft: 10,
		fontFamily: 'Poppins_600SemiBold',
		fontSize: 18,
		marginBottom: 0,
		paddingBottom: 0,
		color: '#fff'
	},
	headAmount: {
		marginTop: 10,
		paddingLeft: 10,
		fontFamily: 'Poppins_600SemiBold',
		fontSize: 18,
		marginBottom: 0,
		paddingBottom: 0,
		color: '#fff',
		alignSelf: 'flex-start'
	},
	input: {
		height: 40,
		borderBottomWidth: 1,
		borderColor: '#cfcfcf',
		width: width / 1.1,
		padding: 10,
		fontFamily: 'Poppins_300Light',
		color: '#fff'
	},
	inputfrom: {
		height: 40,
		borderBottomWidth: 1,
		borderColor: '#cfcfcf',
		padding: 10,
		fontFamily: 'Poppins_300Light',
		color: '#fff'
	},
	mainHead: {
		textAlign: 'center',
		fontFamily: 'Poppins_300Light',
		fontSize: 25,
		marginTop: 20
	},
	btnWrap: {
		marginTop: 30,
		width: width / 1.1
	},
	btnCal: {
		backgroundColor: '#fff',
		color: '#000',
		borderRadius: 5,
		paddingTop: 10,
		paddingBottom: 10,
		textAlign: 'center',
		fontSize: 20,
		fontFamily: 'Poppins_300Light'
	},
	btnDisable: {
		backgroundColor: 'rgba(255,255,255,0.2)',
		color: '#fff',
		borderRadius: 5,
		paddingTop: 10,
		paddingBottom: 10,
		textAlign: 'center',
		fontSize: 20,
		fontFamily: 'Poppins_300Light'
	},
	resultText: {
		textAlign: 'center',
		marginTop: 20,
		fontFamily: 'Poppins_400Regular',
		fontSize: 22,
		color: '#fff'
	}
});

export default Convertor;
