import { Colors } from "@/constants/Colors";
import { Button } from "@rneui/themed";
import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface OAuth2ButtonProps {
    text: string;
    icon: ReactNode;
}

const OAuth2Button: React.FC<OAuth2ButtonProps> = ({ text, icon }) => {
    return (
        <View className="flex-1 m-1 mx-2">
            <Button
            buttonStyle={styles.button}
            >
                <View className="flex-row items-center justify-center gap-1 p-1">
                    {icon}
                    <Text className="text-lg">{text}</Text>
                </View>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    button : {
        backgroundColor: 'white',
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.light.OAuth2BorderButton,
    }
})

export default OAuth2Button;
