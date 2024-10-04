import TicDriveButton from "@/components/ui/buttons/TicDriveButton";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ServicesCards from "@/components/ServicesCards";
import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import { Colors } from "@/constants/Colors";
import {  useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../stateManagement/redux/hooks";
import { login, logout } from "../stateManagement/redux/slices/authSlice";
import { globalStyles } from "../globalStyles";
import necessaryDeviceBottomInset from "../utils/necessaryDeviceBottomInset";
import UserLogged from "@/mock/UserLogged";
import ToPreviousPage from "@/components/navigation/ToPreviousPage";

export default function ChooseServicesScreen() {
    const colorScheme = useColorScheme();
    const isUserLogged = useAppSelector((state) => state.auth.isAuthenticated)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const checkLoginStatus = async () => {
          if(isUserLogged) {
            //mock data
            dispatch(login(UserLogged))
          } else {
            dispatch(logout())
          }
        }
    
        checkLoginStatus()
      }, [])

    return (
        <View className={`flex-1 ${necessaryDeviceBottomInset()}`}>
            <LinearGradient
                colors={[Colors.light.backgroundLinearGradient.start, Colors.light.backgroundLinearGradient.end]}
                className="flex-1 absolute w-full h-full"
            />
                <SafeAreaView className="flex-1" style={globalStyles.safeAreaView}>
                    <TicDriveNavbar />
                    <View className="flex-1 justify-between">
                        <Text style={{ color: colorScheme === 'light' ? Colors.light.text : Colors.dark.text }} className="font-medium text-3xl mx-3.5 mb-2">
                            {isUserLogged ? `${UserLogged.name}, w` : 'W'}hat service are you looking for?
                        </Text>
                        <ServicesCards />
                    </View>
                    <TicDriveButton text="Book a service" path="./RegisterVehicle" />
                </SafeAreaView>
        </View>
    );
}

