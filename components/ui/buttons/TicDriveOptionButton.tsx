import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native"
import { Colors } from "@/constants/Colors";
import React, { ReactNode } from "react";

interface TicDriveOptionButtonProps {
    text: string;
    icon: ReactNode;
    containerTailwindCss?: string;
    textTailwindCss?: string;
    onPress?: () => void;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}

const TicDriveOptionButton:React.FC<TicDriveOptionButtonProps> = ({
    text, 
    icon,
    containerTailwindCss = "",
    textTailwindCss = "",
    onPress = () => {},
    accessibilityLabel = "Option button",
    style= {}
}) => {
    return (
        <TouchableOpacity
            className={`flex-row items-center justify-center gap-x-1 border px-2.5 py-1.5 rounded-3xl ${containerTailwindCss}`}
            style={[styles.cardOptionContainer, style]}
            onPress={onPress}
            accessible={true}
            accessibilityLabel={accessibilityLabel}
        >
            <View>
                {icon}
            </View>
            <Text className={`font-medium text-base ${textTailwindCss}`}>{text}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardOptionContainer: {
        borderColor: Colors.light.green.drive,
    },
})

export default TicDriveOptionButton