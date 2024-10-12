import GlobalContext from "@/app/stateManagement/contexts/GlobalContext";
import { useAppDispatch } from "@/app/stateManagement/redux/hooks";
import { logout } from "@/app/stateManagement/redux/slices/authSlice";
import AuthAction from "@/app/types/auth/Action";
import { saveLoginStatus } from "@/app/utils";
import { Colors } from "@/constants/Colors"
import { Entypo } from "@expo/vector-icons"
import { StackActions, useNavigationState } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

interface TicDriveAuthButtonProps {
    onPress?: () => void;
    action: AuthAction
}

const TicDriveAuthButton:React.FC<TicDriveAuthButtonProps> = ({
    onPress,
    action
}) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const currentRoute = useNavigationState(state => state.routes[state.index])

    const handleLogout = async () => {
        dispatch(logout())       
        if(currentRoute.name != 'screens/LandingScreen') {
            if(navigation.canGoBack()) {
                navigation.dispatch(StackActions.popToTop)
            }
            router.replace('../screens/LandingScreen')
        }
        await saveLoginStatus(false)
        
        //sostituire con redux thunk?
    }

    const handleOnPress = () => {
        onPress && onPress()
        action === "logout" && handleLogout()
    }

    return (
        <TouchableOpacity onPress={handleOnPress} className={`p-2.5 rounded-2xl ${action === "login" ? "bg-green-500" : "bg-slate-500"}`}>
            <View className='flex-row gap-1 items-center justify-center'>
                <Entypo name="login" size={24} color="white" />
                <Text className='text-xl text-white'>{action[0].toUpperCase() + action.slice(1)}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default TicDriveAuthButton