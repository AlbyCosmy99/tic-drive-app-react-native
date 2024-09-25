import ToPreviousPage from "@/components/navigation/ToPreviousPage";
import OAuth2Button from '@/components/ui/buttons/OAuth2Button';
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { saveLoginStatus } from "../utils";
import { useContext, useMemo, useState } from "react";
import GlobalContext from "../stateManagement/contexts/GlobalContext";
import { StackActions, useNavigation } from "@react-navigation/native";
import TicDriveButton from "@/components/ui/buttons/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch } from "../stateManagement/redux/hooks";
import { login } from "../stateManagement/redux/slices/authSlice";
import GoogleIcon from "@/assets/svg/OAuth2Icons/GoogleIcon";
import AppleIcon from "@/assets/svg/OAuth2Icons/AppleIcon";

export default function UserAuthentification() {
    const { setServicesChoosen, loginBtnCustomPath, setLoginBtnCustomPath } = useContext(GlobalContext);
    const navigation = useNavigation();
    const dispatch = useAppDispatch()
    const [isUserRegistering, setIsUserRegistering] = useState<boolean>(false)

    const action = useMemo<"Login" | "Register">(() => {
        return isUserRegistering ? "Register" : "Login"
    }, [isUserRegistering])

    const handleLoginPressed = async () => {
        dispatch(login({
            name: "Andrei",
            surname: "Albu"
        }))
        await saveLoginStatus(true)
        //sostituire con react-thunk

        setServicesChoosen([]);
        if (loginBtnCustomPath) {
            if (navigation.canGoBack()) {
                navigation.dispatch(StackActions.popToTop());
            }
            router.replace(loginBtnCustomPath);
            setLoginBtnCustomPath(undefined);
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            router.replace('/');
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <ToPreviousPage />
            <View className="flex-1">
                <View style={styles.logo} className="justify-center items-center">
                    <Text>Image</Text>
                </View>
                <View>
                    <Text className="text-center text-3xl font-medium m-1.5">Welcome</Text>
                    <View className="flex-row justify-center gap-1">
                        {
                            action === "Login" ?
                            (<Text>Don't have an account?</Text>) :
                            (<Text>Already have an account?</Text>)
                        }
                        <TouchableOpacity onPress={() => setIsUserRegistering(!isUserRegistering)}>
                            <Text className="font-medium">{action === "Login" ? "Register" : "Login"} here</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text className="text-center m-4">Form</Text>
                    </View>
                    <TicDriveButton
                        text={action}
                        onClick={handleLoginPressed}
                    />
                    <View className="flex-row justify-center items-center my-3.5">
                        <View style={styles.hr} />
                        <Text className="text-center" style={styles.continueWithText}>Or continue with</Text>
                        <View style={styles.hr} />
                    </View>
                    <View className="flex-row mx-3.5">
                        <OAuth2Button text="Google" icon={<GoogleIcon />} />
                        <OAuth2Button text="Apple ID" icon={<AppleIcon />} />
                    </View>
                    <View className="flex-row justify-center gap-1 flex-wrap text-center mx-3.5 my-3">
                        <Text style={styles.footerText}>By clicking {action}, you agree to our</Text>
                        <TouchableOpacity>
                            <Text style={styles.link}>Terms of Service</Text>    
                        </TouchableOpacity> 
                        <Text style={styles.footerText}>and</Text>
                        <TouchableOpacity>
                            <Text style={styles.link}>Privacy Policy</Text>    
                        </TouchableOpacity>  
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        flex: 1,
    },
    hr: {
        borderBottomColor: '#e6e6e6',
        borderBottomWidth: 1.5,
        margin: 10,
        flex: 1,
    },
    continueWithText: {
        color: Colors.light.placeholderText,
    },
    link: {
        color: 'black'
    },
    footerText: {
        color: Colors.light.placeholderText
    }
});
