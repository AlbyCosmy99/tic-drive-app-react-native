
import ToPreviousPage from "@/components/navigation/ToPreviousPage";
import { Button } from "@rneui/themed";
import { Link, router } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { saveLoginStatus } from "../utils";

export default function Login() {

    const handleLoginPressed = () => {
        saveLoginStatus(true);
        router.push('/');
    }

    return (
        <SafeAreaView className="flex-1">
            <ToPreviousPage />
            <Button onPress={handleLoginPressed}>
                <Text className="text-emerald-500 text-3xl">Login</Text>
            </Button>
        </SafeAreaView>
    )
}