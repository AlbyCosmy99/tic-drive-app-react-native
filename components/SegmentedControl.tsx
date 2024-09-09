import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import options from '../constants/VehicleRegistrationOptions'
import { SegmentedControlSelection } from '@/app/types/interfaces';

interface SegmentedControlProps {
  segmentedControlSelection: SegmentedControlSelection | null,
  setSegmentedControlSelection: (selection: SegmentedControlSelection) => void
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({segmentedControlSelection, setSegmentedControlSelection}) => {
  const animatedValue = useState<Animated.Value>(new Animated.Value(0))[0];

  const handleOptionPress = (option: SegmentedControlSelection): void => {
    setSegmentedControlSelection(option);
    Animated.timing(animatedValue, {
      toValue: option.index,
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
    <View className='m-3.5'>
      <View className='flex-row h-16 justify-between' style={styles.segmentContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className='flex-1 items-center justify-center z-10'
            onPress={() => handleOptionPress(option)}
            accessible={true}
            accessibilityLabel={"register car by " + option.name}
          >
            <Text
              style={[
                styles.optionText,
                (!segmentedControlSelection && index === 0 || segmentedControlSelection?.index === index) && styles.selectedText,
              ]}
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View className="absolute inset-y-1 z-0" style={[styles.slidingIndicator, slidingIndicatorStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  segmentContainer: {
    backgroundColor: Colors.light.SegmentedControlBackground,
    borderRadius: 50,
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
    width: '33.33%',
    backgroundColor: Colors.light.background,
    borderRadius: 30,
  },
});

export default SegmentedControl;
