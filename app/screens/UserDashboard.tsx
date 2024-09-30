import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import TicDriveButton from "@/components/ui/buttons/TicDriveButton";
import { SafeAreaView, Text, View } from "react-native";
import { globalStyles } from "../globalStyles";
import necessaryDeviceBottomInset from "../utils/necessaryDeviceBottomInset";

export default function UserDashboard() {
    return (
        <SafeAreaView className={`flex-1 ${necessaryDeviceBottomInset()}`} style={globalStyles.safeAreaView}>
            <TicDriveNavbar />
            <View className="flex-1 justify-center items-center">
                <Text>user dashboard</Text>
            </View>
            <TicDriveButton text="Book a new service" path={'/'} replace={true} toTop={true} />
        </SafeAreaView>
    )
}