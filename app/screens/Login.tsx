
import ToPreviousPage from "@/components/navigation/ToPreviousPage";
import { Button } from "@rneui/themed";
import { Href, router } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { saveLoginStatus } from "../utils";
import { useContext } from "react";
import GlobalContext from "../stateManagement/contexts/GlobalContext";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const {setServicesChoosen, loginBtnCustomPath, setLoginBtnCustomPath,setIsUserLogged} = useContext(GlobalContext)
    const navigation = useNavigation()

    const handleLoginPressed = () => {
        saveLoginStatus(true);
        setIsUserLogged(true)
        setServicesChoosen([])
        if(loginBtnCustomPath) {
            router.replace(loginBtnCustomPath)
            setLoginBtnCustomPath(undefined)
        }
        else if(navigation.canGoBack()) {
            alert('here')
            navigation.goBack()
        }
        else {
            router.replace('/')
        }
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