import { Button } from "@rneui/themed";
import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";

interface OAuth2ButtonProps {
    text: string;
    icon: ReactNode;
}

const OAuth2Button: React.FC<OAuth2ButtonProps> = ({ text, icon }) => {
    return (
        <Button
            buttonStyle={styles.button}
        >
            <View className="flex-row items-center justify-center gap-1">
                {icon}
                <Text className="text-lg">{text}</Text>
            </View>
        </Button>
    );
};

const styles = StyleSheet.create({
    button : {
        backgroundColor: 'white',
        borderRadius: 40,
    }
})

export default OAuth2Button;
