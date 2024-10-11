import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch } from "../stateManagement/redux/hooks";
import { login, logout } from "../stateManagement/redux/slices/authSlice";
import { getLoginStatus } from "../utils";
import { useEffect } from "react";
import UserLogged from "@/mock/UserLogged";
import LottieView from "lottie-react-native";

const Hub = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userAuthStatus = await getLoginStatus();
                if (userAuthStatus) {
                    dispatch(login(UserLogged));
                    router.replace('../(tabs)/Home');
                } else {
                    dispatch(logout());
                    router.replace('../screens/LandingScreen');
                }
            } catch (error) {
                console.error("Error checking auth status: ", error);
            }
        };
        checkAuth();
    }, [dispatch]);

    return (
        <View className="justify-center items-center w-full h-full bg-white">
            <LottieView
                source={require('@/assets/json/animations/TicDriveLoadingGrey.json')}
                autoPlay
                loop
                style={styles.lottieAnimation}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    lottieAnimation: {
        width: '100%',
        alignSelf: 'flex-end',
        height: 300
    },
})

export default Hub;
