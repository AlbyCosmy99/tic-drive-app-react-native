import { Colors } from "@/constants/Colors"
import { StyleSheet, Text, View } from "react-native"
import TicDriveInput from "./TicDriveInput"
import React from "react";

interface TicDriveTextOrInputProps {
    value: any;
    setValue: (value:any) => void;
    placeholder: string;
}

const TicDriveTextOrInput:React.FC<TicDriveTextOrInputProps> = ({value, setValue, placeholder = 'Insert value'}) => {
    return (
        <View
            className="my-1 border-b mx-3"
            style={styles.carDetailContainer}
        >
            <Text className="font-bold mb-0.5 text-lg">Year</Text>
            {
            value ? (
                <Text className="text-lg mb-1.5">{value}</Text>
            ) : (
                <TicDriveInput placeholder={placeholder} customValue={value.toString()} onChange={(text) => setValue(text)} isRightIcon/>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    carDetailContainer: {
        borderBottomColor: Colors.light.extremelyLightGrey,
    },
})

export default TicDriveTextOrInput