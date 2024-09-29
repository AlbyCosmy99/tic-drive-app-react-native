import ToPreviousPage from "@/components/navigation/ToPreviousPage";
import OAuth2Button from '@/components/ui/buttons/OAuth2Button';
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { saveLoginStatus } from "../utils";
import { useContext, useMemo, useState } from "react";
import GlobalContext from "../stateManagement/contexts/GlobalContext";
import { StackActions, useNavigation } from "@react-navigation/native";
import TicDriveButton from "@/components/ui/buttons/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch } from "../stateManagement/redux/hooks";
import { login } from "../stateManagement/redux/slices/authSlice";
import GoogleIcon from "@/assets/svg/OAuth2Icons/GoogleIcon";
import AppleIcon from "@/assets/svg/OAuth2Icons/AppleIcon";
import UserAuthenticationForm from "@/components/forms/UserAuthenticationForm";
import { Image } from "@rneui/themed";
import TicDriveLogo from '../../assets/images/TicDriveLogo.jpeg';
import UserAuthenticationContent from "@/components/auth/UserAuthentificationContent";

export default function UserAuthentification() {
    const [isUserRegistering, setIsUserRegistering] = useState<boolean>(false)

    const action = useMemo<"Login" | "Register">(() => {
        return isUserRegistering ? "Register" : "Login"
    }, [isUserRegistering])

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <SafeAreaView className="flex-1 bg-white">
                <ToPreviousPage />
                <View className="flex-1 justify-between">
                    <View style={styles.logo} className="justify-center items-center">
                        <Image 
                            source={TicDriveLogo}
                            style={styles.logoImage}
                        />
                    </View>
                    {
                        isUserRegistering ? (
                            <ScrollView style={styles.content}>
                                <UserAuthenticationContent 
                                    action={action}
                                    isUserRegistering={isUserRegistering}
                                    setIsUserRegistering={setIsUserRegistering}
                                />
                            </ScrollView>) : (
                            <View style={styles.content}>
                                <UserAuthenticationContent 
                                    action={action}
                                    isUserRegistering={isUserRegistering}
                                    setIsUserRegistering={setIsUserRegistering}
                                />
                            </View>
                        )
                    }
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    logo: {
        
    },
    content: {
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
    },
    logoImage: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
});
