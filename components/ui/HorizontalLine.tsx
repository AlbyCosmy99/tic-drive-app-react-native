import { Colors } from "@/constants/Colors"
import { View } from "react-native"

const HorizontalLine = () => {
    return (
        <View className='w-full justify-center items-center'>
            <View style={{height: 1, width: '100%', backgroundColor: Colors.light.ticText}}></View>
        </View>
    )
}

export default HorizontalLine