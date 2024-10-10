import AuthAction from "@/app/types/auth/Action";
import { Colors } from "@/constants/Colors"
import { Entypo } from "@expo/vector-icons"
import React from "react";
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

interface TicDriveAuthButtonProps {
    onPress: () => void;
    action: AuthAction
}

const TicDriveAuthButton:React.FC<TicDriveAuthButtonProps> = ({
    onPress,
    action
}) => {
    return (
        <TouchableOpacity onPress={onPress} className='p-2.5 bg-green-500 rounded-2xl'>
            <View className='flex-row gap-1 items-center justify-center'>
                <Entypo name="login" size={24} color="white" />
                <Text className='text-xl text-white'>{action[0].toUpperCase() + action.slice(1)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TicDriveAuthButton