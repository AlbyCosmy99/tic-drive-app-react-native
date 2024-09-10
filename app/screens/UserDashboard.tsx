import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import { SafeAreaView, Text, View } from "react-native";

export default function UserDashboard() {
    return (
        <SafeAreaView className="flex-1">
            <TicDriveNavbar />
            <View className="flex-1 justify-center items-center">
                <Text>user dashboard</Text>
            </View>
        </SafeAreaView>
    )
}