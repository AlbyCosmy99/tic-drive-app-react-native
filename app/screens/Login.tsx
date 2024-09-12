import ToPreviousPage from "@/components/navigation/ToPreviousPage";
import { Button } from "@rneui/themed";
import { Href, router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { saveLoginStatus } from "../utils";
import { useContext } from "react";
import GlobalContext from "../stateManagement/contexts/GlobalContext";
import { StackActions, useNavigation } from "@react-navigation/native";
import TicDriveButton from "@/components/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Login() {
    const {setServicesChoosen, loginBtnCustomPath, setLoginBtnCustomPath,setIsUserLogged} = useContext(GlobalContext)
    const navigation = useNavigation()

    const handleLoginPressed = () => {
        saveLoginStatus(true);
        setIsUserLogged(true)
        setServicesChoosen([])
        if(loginBtnCustomPath) {
            if(navigation.canGoBack()){
                navigation.dispatch(StackActions.popToTop())
            }
            router.replace(loginBtnCustomPath)
            setLoginBtnCustomPath(undefined)
        }
        else if(navigation.canGoBack()) {
            navigation.goBack()
        }
        else {
            router.replace('/')
        }
    }

    return (
        <SafeAreaView className="flex-1">
            <ToPreviousPage />
            <View className="flex-1">
                <View style={styles.logo} className="justify-center items-center">
                    <Text>Image</Text>
                </View>
                <View className="" style={styles.loginData}>
                    <Text className="text-center text-3xl font-medium m-1.5">Welcome</Text>
                    <View className="flex-row justify-center gap-1">
                        <Text>Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text className="font-medium">Register here</Text>  
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text className="text-center m-4">Form</Text>
                    </View>
                    <TicDriveButton 
                        text="Login" 
                        onClick={handleLoginPressed} 
                    />
                    <View className="flex-row justify-center items-center my-3.5">
                        <View style={styles.hr}/>
                        <Text className="text-center" style={styles.continueWithText}>Or continue with</Text>
                        <View style={styles.hr}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        flex: 4,
        
    },
    loginData: {
        flex: 6,
    },
    hr: {
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1.5,   
        margin: 10,
        flex: 1
    },
    continueWithText: {
        color: Colors.light.placeholderText
    }
});
