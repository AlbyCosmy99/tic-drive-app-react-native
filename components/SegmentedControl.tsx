import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

interface SegmentedControlProps {}

const SegmentedControl: React.FC<SegmentedControlProps> = () => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const animatedValue = useState<Animated.Value>(new Animated.Value(0))[0];

  const options: string[] = ['Licence Plate', 'Model', 'VIN'];

  const handleOptionPress = (index: number): void => {
    setSelectedOption(index);
    Animated.timing(animatedValue, {
      toValue: index,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const slidingIndicatorStyle = {
    left: animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['0%', '33.33%', '66.66%'],
    }),
  };

  return (
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.touchable}
            onPress={() => handleOptionPress(index)}
          >
            <Text
              style={[
                styles.optionText,
                selectedOption === index && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View style={[styles.slidingIndicator, slidingIndicatorStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  segmentContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.light.SegmentedControlBackground,
    borderRadius: 50,
    justifyContent: 'space-between',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    fontSize: 16,
    color: Colors.light.bookingsOptionsText,
  },
  selectedText: {
    color: Colors.light.text,
    fontWeight: 'bold',
  },
  slidingIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    width: '33.33%',
    backgroundColor: Colors.light.background,
    borderRadius: 30,
    zIndex: 0,
  },
});

export default SegmentedControl;
