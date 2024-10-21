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
        <View className="border-slate-500 rounded-xl rounded-t border-2 relative w-4/5 p-2 bg-slate-100 mx-auto mb-2">
            <Text className="absolute right-0 top-0 text-white bg-green-500 text-xl font-semibold p-1 rounded-t-xl">PIN: {pin}</Text>
            <View>
                <Text className="font-semibold text-xl">{model}</Text>
                <View className="flex-row justify-between items-center mt-">
                    <Text className="font-medium text-lg">{service}</Text>
                </View>
            </View>
            <View className="flex-row justify-between mt-2 items-center">
                <View className="flex-row gap-2 justify-center items-center">
                    <Text className="font-semibold text-xl">{price}</Text>
                    <Text className="text-green-500 text-base">Paid!</Text>
                </View>
                <Text className={`${time.includes("TODAY") ? 'text-red-500' : ''} font-semibold text-2xl`}>{time}</Text>
            </View>
        </View>
    )
}

export default PrenotationBookedCard