import { Colors } from "@/constants/Colors";
import React from "react";
import { Text, View } from "react-native"

interface PrenotationBookedCardProps {
    model: string;
    service: string;
    price: string;
    time: string;
    pin: number;
}

const PrenotationBookedCard: React.FC<PrenotationBookedCardProps> = ({
    model,
    service,
    price,
    time,
    pin
}) => {
    return (
        <>
            <View className="rounded-xl rounded-t w-4/5 p-2 mx-auto my-2">
                <View>
                    <Text className="font-semibold text-xl">{model}</Text>
                    <View className="flex-row justify-between items-center mt-">
                        <View className="rounded-lg bg-green-500">
                            <Text className="text-white text-2xl font-semibold p-1">{service}</Text>
                        </View>
                        <Text className="font-medium text-lg">PIN: {pin}</Text>
                    </View>
                </View>
                <View className="flex-row justify-between mt-2 items-center">
                    <View className="flex-row gap-2 justify-center items-center">
                        <Text className="font-semibold text-xl">{price}</Text>
                        <Text className="text-green-500 text-xl" style={{fontFamily: 'SpaceMono'}}>Paid!</Text> 
                    </View>
                    <Text className={`${time.includes("TODAY") ? 'text-red-500' : ''} font-semibold text-xl`}>{time}</Text>
                </View>
            </View>
            <View className='w-full justify-center items-center'>
                <View style={{height: 1, width: '90%', backgroundColor: Colors.light.ticText}}></View>
            </View>
        </>
    )
}

export default PrenotationBookedCard