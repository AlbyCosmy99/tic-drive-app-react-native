import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import options from '../constants/VehicleRegistrationOptions'
import { StructuredFormatting } from 'react-native-google-places-autocomplete';

interface Option {
  index: number, 
  name: string, 
  placeholder: string, 
  inputLabel: string
}
interface SegmentedControlProps {
  segmentedControlSelection: Option,
  setSegmentedControlSelection: (selection: Option) => void
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({segmentedControlSelection, setSegmentedControlSelection}) => {
  const animatedValue = useState<Animated.Value>(new Animated.Value(0))[0];

  const handleOptionPress = (option: Option): void => {
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
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.touchable}
            onPress={() => handleOptionPress(option)}
          >
            <Text
              style={[
                styles.optionText,
                segmentedControlSelection.index === index && styles.selectedText,
              ]}
            >
              {option.name}
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
