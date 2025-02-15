import SafeAreaViewLayout from "@/app/layouts/SafeAreaViewLayout"
import { Text } from "@rneui/themed"
import { View } from "react-native"

const ChatScreen = () => {
    return (
        <SafeAreaViewLayout>
            <View className="w-full h-full justify-center items-center">
                <Text>chat</Text>
            </View>
        </SafeAreaViewLayout>
    )
}

export default ChatScreen