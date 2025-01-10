import { Colors } from "@/constants/Colors"
import React from "react";
import { Text, useColorScheme } from "react-native"

interface BoldTitle1Props {
    title: string;
}

const BoldTitle1:React.FC<BoldTitle1Props> = ({title}) => {
    const colorScheme = useColorScheme();
    return (
        <Text
            style={{
            color:
                colorScheme === 'light' ? Colors.light.text : Colors.dark.text,
            }}
            className="font-medium mb-2 text-3xl mx-3.5"
        >
            {title}
        </Text>
    )
}

export default BoldTitle1