import isAndroidPlatform from "@/utils/devices/isAndroidPlatform";
import { View } from "react-native";
import { Pressable, TouchableWithoutFeedback } from "react-native-gesture-handler";

interface CrossPlatformButtonLayoutProps {
    children: React.ReactNode;
    onPress: () => void
}

const CrossPlatformButtonLayout: React.FC<CrossPlatformButtonLayoutProps> = ({children, onPress}) => {
    return (
        <View style={{width: '40%', height: 40}} className="border-2 border-grey-light p-2 mx-2.5 my-1 rounded-xl items-center justify-center flex-row">
            {
                isAndroidPlatform() ? (
                    <TouchableWithoutFeedback
                        onPress={onPress}
                        className="items-center justify-center flex-row"
                    >
                        {children}
                    </TouchableWithoutFeedback>
                ) : (
                    <Pressable
                        onPress={onPress}
                        className="items-center justify-center flex-row" 
                    >
                        {children}
                    </Pressable>
                )
            }
        </View>
    )
}

export default CrossPlatformButtonLayout