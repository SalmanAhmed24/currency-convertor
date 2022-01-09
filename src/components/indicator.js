import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, ActivityIndicator } from 'react-native';
const { width } = Dimensions.get('screen');
const Indicator = ({ scrollX, slides }) => {
	return (
		<View style={styles.container}>
			{slides && slides.length ? (
				slides.map((_, i) => {
					const inputRange = [ (i - 1) * width, i * width, (i + 1) * width ];
					const scale = scrollX.interpolate({
						inputRange,
						outputRange: [ 0.8, 1.4, 0.8 ],
						extrapolate: 'clamp'
					});
					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [ 0.5, 1, 0.5 ],
						extrapolate: 'clamp'
					});
					return (
						<Animated.View
							key={`indicator-${i}`}
							style={{
								width: 6,
								height: 6,
								borderRadius: 5,
								marginRight: 7,
								backgroundColor: '#fff',
								opacity: opacity,
								transform: [
									{
										scale
									}
								]
							}}
						/>
					);
				})
			) : (
				<ActivityIndicator size="large" color="#00ff00" />
			)}
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center'
	}
});

export default Indicator;
