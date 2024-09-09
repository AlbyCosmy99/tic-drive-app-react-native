
import ToPreviousPage from "@/components/navigation/ToPreviousPage";
import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { saveLoginStatus } from "../utils";

export default function Login() {
    const handleLoginPressed = () => {
        saveLoginStatus(true);
        router.replace('/');
    }

    return (
        <SafeAreaView className="flex-1">
            <ToPreviousPage path={'/'}/>
            <Button onPress={handleLoginPressed}>
                <Text className="text-emerald-500 text-3xl">Login</Text>
            </Button>
        </SafeAreaView>
    )
}