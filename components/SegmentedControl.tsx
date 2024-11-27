import {Colors} from '@/constants/Colors';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import SegmentedControlSelection from '@/types/SegmentedControlSelection';

interface SegmentedControlProps {
  options: any[];
  segmentedControlSelection: SegmentedControlSelection | null;
  setSegmentedControlSelection: (selection: SegmentedControlSelection) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  segmentedControlSelection,
  setSegmentedControlSelection,
}) => {
  const animatedValue = useState<Animated.Value>(new Animated.Value(0))[0];

  const handleOptionPress = (option: SegmentedControlSelection): void => {
    setSegmentedControlSelection(option);
    Animated.timing(animatedValue, {
      toValue: option.index,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const calculateOutputRange = (length: number) => {
    const step = 100 / length;
    return Array.from({length}, (_, index) => `${index * step}%`);
  };

  const slidingIndicatorStyle = {
    left: animatedValue.interpolate({
      inputRange: options.map((_, index) => index),
      outputRange: calculateOutputRange(options.length),
    }),
    width: `${100 / options.length}%`,
  };

  return (
    <View
      className="flex-row h-16 justify-between flex items-center"
      style={styles.segmentContainer}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          className="flex-1 items-center justify-center z-10 h-full"
          onPress={() => handleOptionPress(option)}
          accessible={true}
          accessibilityLabel={option.name}
        >
          <Text
            style={[
              styles.optionText,
              ((!segmentedControlSelection && index === 0) ||
                segmentedControlSelection?.index === index) &&
                styles.selectedText,
            ]}
          >
            {option.name}
          </Text>
        </TouchableOpacity>
      ))}
      <Animated.View
        className="absolute"
        style={[styles.slidingIndicator, slidingIndicatorStyle]}
      />
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
    position: 'absolute',
    height: '90%',
    backgroundColor: Colors.light.background,
    borderRadius: 30,
  },
});

export default SegmentedControl;
