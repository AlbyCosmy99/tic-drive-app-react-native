import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import TicDriveButton from "@/components/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { SafeAreaView, Text, View } from "react-native";
import GlobalContext from "../stateManagement/contexts/GlobalContext";

export default function CalendarDateSelection() {
    const {isUserLogged, setLoginBtnCustomPath} = useContext(GlobalContext)

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
                    onClick={() => setLoginBtnCustomPath('../screens/BookingConfirmation')}   
                    replace={true}            
                />
            </SafeAreaView>
        </LinearGradient>
    )
}