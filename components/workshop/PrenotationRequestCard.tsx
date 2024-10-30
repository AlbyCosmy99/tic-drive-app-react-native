import React from 'react';
import {Pressable, Text, View} from 'react-native';
import HorizontalLine from '../ui/HorizontalLine';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

interface PrenotationRequestCardProps {
  model: string;
  service: string;
  price: string;
  time: string;
  pin: number;
  number: number;
}

const PrenotationRequestCard: React.FC<PrenotationRequestCardProps> = ({
  model,
  service,
  price,
  time,
  number,
}) => {
  return (
    <>
      <View>
        <View className="rounded-xl rounded-t w-4/5 p-2 mx-auto my-2">
          <View>
            <Text className="font-semibold text-xl">{model}</Text>
            <View className="flex-row justify-between items-center mt-">
              <Text className="text-black text-2xl font-semibold">
                {service}
              </Text>
              <Text className="font-medium text-lg">
                Request: {number}/2024
              </Text>
            </View>
          </View>
          <View className="flex-row justify-between mt-2 items-center">
            <View className="flex-row gap-2 justify-center items-center">
              <Text className="font-semibold text-xl">{price}</Text>
            </View>
            <Text
              className={`${time.includes('TODAY') ? 'text-red-500' : ''} font-semibold text-xl`}
            >
              {time}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View className="flex-row mx-6 justify-evenly items-center">
          <Pressable
            className="bg-green-500 p-2 rounded-xl flex-row justify-center items-center"
            onPress={() => {}}
            style={{width: '48%'}}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Accept
            </Text>
          </Pressable>
          <Pressable
            className="bg-red-500 p-2 rounded-xl flex-row justify-center items-center"
            onPress={() => {}}
            style={{width: '48%'}}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Reject
            </Text>
          </Pressable>
        </View>
        <TouchableWithoutFeedback
          className="bg-orange-500 m-2 mb-3 mx-6 p-2 rounded-xl flex-row justify-center items-center"
          onPress={() => {}}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Suggest a new time
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <HorizontalLine />
    </>
  );
};

export default PrenotationRequestCard;
