import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import TicDriveButton from "@/components/ui/buttons/TicDriveButton";
import { SafeAreaView, Text, View } from "react-native";

export default function UserDashboard() {
    return (
        <SafeAreaView className="flex-1">
            <TicDriveNavbar />
            <View className="flex-1 justify-center items-center">
                <Text>user dashboard</Text>
            </View>
            <TicDriveButton text="Book a new service" path={'/'} replace={true} toTop={true} />
        </SafeAreaView>
    )
}