import ToPreviousPage from "@/components/navigation/ToPreviousPage";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "@rneui/themed";
import TicDriveLogo from '../../assets/images/TicDriveLogo.jpeg';
import UserAuthenticationContent from "@/components/auth/UserAuthentificationContent";
import { globalStyles } from "../globalStyles";
import isIOSPlatform from "../utils/IsIOSPlatform";

export default function UserAuthentification() {
    const [isUserRegistering, setIsUserRegistering] = useState<boolean>(false)

    const action = useMemo<"Login" | "Register">(() => {
        return isUserRegistering ? "Register" : "Login"
    }, [isUserRegistering])

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior={isIOSPlatform() ? "padding" : "height"}
        >
            <SafeAreaView className="flex-1 bg-white" style={globalStyles.safeAreaView}>
                <ToPreviousPage />
                <View className="flex-1 justify-between">
                    <View className="justify-center items-center">
                        <Image 
                            source={TicDriveLogo}
                            style={styles.logoImage}
                        />
                    </View>
                    <ScrollView style={styles.content}>
                        <UserAuthenticationContent 
                            action={action}
                            isUserRegistering={isUserRegistering}
                            setIsUserRegistering={setIsUserRegistering}
                        />
                    </ScrollView>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
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
