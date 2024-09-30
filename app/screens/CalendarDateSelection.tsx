import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import TicDriveButton from "@/components/ui/buttons/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
import GlobalContext from "../stateManagement/contexts/GlobalContext";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../stateManagement/redux/hooks";
import { globalStyles } from "../globalStyles";

export default function CalendarDateSelection() {
    const {setLoginBtnCustomPath} = useContext(GlobalContext)
    const isUserLogged = useAppSelector(state => state.auth.isAuthenticated)

    return (
        <LinearGradient 
            colors={[Colors.light.backgroundLinearGradient.start, Colors.light.backgroundLinearGradient.end]}
            className="flex-1 w-full h-full"
        >
            <SafeAreaView className="flex-1 justify-between" style={globalStyles.safeAreaView}>
                <TicDriveNavbar isLoginAvailable={false}/>
                <View className="items-center justify-center flex-1">
                    <Text>select date and hour</Text>
                </View>
                <TicDriveButton 
                    text={"Confirm " + (!isUserLogged ? "and login": "")} 
                    path={isUserLogged ? '../screens/BookingConfirmation' : '../screens/UserAuthentification'}
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