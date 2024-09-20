import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import TicDriveButton from "@/components/ui/buttons/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
import GlobalContext from "../stateManagement/contexts/GlobalContext";
import { StackActions, useNavigation } from "@react-navigation/native";

export default function CalendarDateSelection() {
    const {isUserLogged, setLoginBtnCustomPath} = useContext(GlobalContext)
    const navigation = useNavigation()

    return (
        <LinearGradient 
            colors={[Colors.light.backgroundLinearGradient.start, Colors.light.backgroundLinearGradient.end]}
            className="flex-1 w-full h-full"
        >
            <SafeAreaView className="flex-1 justify-between">
                <TicDriveNavbar isLoginAvailable={false}/>
                <View className="items-center justify-center flex-1">
                    <Text>select date and hour</Text>
                </View>
                <TicDriveButton 
                    text={"Confirm " + (!isUserLogged ? "and login": "")} 
                    path={isUserLogged ? '../screens/BookingConfirmation' : '../screens/Login'}
                    toTop={isUserLogged ? true : false}
                    replace={isUserLogged ? true : false}
                    onClick={isUserLogged ? (
                        () => {}
                    ) : (
                        () => setLoginBtnCustomPath('../screens/BookingConfirmation')
                    )}      
                />
            </SafeAreaView>
        </LinearGradient>
    )
}