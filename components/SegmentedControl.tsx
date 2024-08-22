import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

// Type definitions for props and state (if needed)
interface SegmentedControlProps {}

const SegmentedControl: React.FC<SegmentedControlProps> = () => {
  // Define state with useState hook and types
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const animatedValue = useState<Animated.Value>(new Animated.Value(0))[0]; // For sliding animation

  const options: string[] = ['Option 1', 'Option 2', 'Option 3'];

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
      outputRange: ['0%', '33.33%', '66.66%'], // 3 options, so each occupies 33.33% of width
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

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  segmentContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  touchable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  selectedText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  slidingIndicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '33.33%', // 3 options, so each occupies 33.33%
    backgroundColor: '#3498db',
    borderRadius: 20,
    zIndex: 0,
  },
});

export default SegmentedControl;
