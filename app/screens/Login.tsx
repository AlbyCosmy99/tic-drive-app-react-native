
import ToPreviousPage from "@/components/navigation/ToPreviousPage";
import { Button } from "@rneui/themed";
import { router } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { saveLoginStatus } from "../utils";
import { useContext } from "react";
import GlobalContext from "../stateManagement/contexts/GlobalContext";

export default function Login() {
    const {setServicesChoosen} = useContext(GlobalContext)

    const handleLoginPressed = () => {
        saveLoginStatus(true);
        setServicesChoosen([])
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