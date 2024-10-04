import { LinearGradient } from "expo-linear-gradient";
import { router, useNavigation } from "expo-router";
import { StyleSheet, Text, View } from "react-native";;
import { globalStyles } from "../globalStyles";
import { Colors } from "@/constants/Colors";
import { Image } from "@rneui/themed";
import TicDriveLogo from '../../assets/images/TicDriveLogo.jpeg';
import ServicesCard from "@/components/ServicesCard";
import LottieView from 'lottie-react-native'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../stateManagement/redux/hooks";
import { logout } from "../stateManagement/redux/slices/authSlice";
import { saveLoginStatus } from "../utils";
import { Entypo } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";

const ChooseUserModeScreen = () => {

    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const isUserLogged = useAppSelector((state) => state.auth.isAuthenticated)

    const handleLogout = async () => {
        dispatch(logout())
        await saveLoginStatus(false)
        //sostituire con redux thunk?
      }
    

    return (
        <View className={`flex-1`}>
            <LinearGradient
                colors={[Colors.light.backgroundLinearGradient.start,Colors.light.backgroundLinearGradient.start, Colors.light.green.drive]}
                locations={[0, 0.45, 1]} 
                className="flex-1 absolute w-full h-full"
            >
                <View className="flex-1 justify-between" style={globalStyles.safeAreaView}>
                    <View className="justify-center items-center flex-1">
                        <Image 
                            source={TicDriveLogo}
                            style={styles.logoImage}
                        />
                    </View>
                    <LottieView
                        source={require('@/assets/json/animations/carPhoneSliding.json')}
                        autoPlay
                        loop
                        style={styles.lottieAnimation}
                    />
                    <LinearGradient
                        colors={[Colors.light.backgroundLinearGradient.start, Colors.light.green.drive, Colors.light.green.drive]} // Define your gradient colors here
                        style={styles.content} // Apply gradient to the content view
                        locations={[0, 0.4, 1]} // Adjust the position of the gradient transition
                        className="p-2 items-end"
                    >
                        <View className="flex-row justify-center items-center p-2">
                            <View className="flex-1">
                                <ServicesCard 
                                    id={1} 
                                    title="Search a service" 
                                    description="What service are you looking for?"
                                    cardStyle={styles.card}
                                    titleStyle={styles.cardTitle}
                                    descriptionStyle={styles.cardDescription}
                                    iconStyle={styles.cardIcon}
                                    iconWidth={40}
                                    iconHeight={40}
                                    isCheckIconAvailable={false}
                                />
                            </View>
                            <View className="flex-1">
                                <ServicesCard 
                                    id={2} 
                                    title="Offer a service" 
                                    description="What services do you want to offer?"
                                    cardStyle={styles.card}
                                    titleStyle={styles.cardTitle}
                                    descriptionStyle={styles.cardDescription}
                                    iconStyle={styles.cardIcon}
                                    iconWidth={40}
                                    iconHeight={40}
                                    isCheckIconAvailable={false}
                                />
                            </View>
                        </View>
                        <View className='flex-1 justify-end flex-row mx-5'>
                            {isUserLogged ? (
                                    <TouchableOpacity onPress={handleLogout} className='p-2.5'>
                                    <View className='flex-row gap-1 items-center justify-center'>
                                        <Entypo name="login" size={24} color={Colors.light.text} />
                                        <Text className='text-xl' style={styles.login}>Logout</Text>
                                    </View>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={() => {
                                    if(navigation.canGoBack()) {
                                        navigation.dispatch(StackActions.popToTop());
                                    }
                                    router.push('../screens/UserAuthentification')
                                    }} className='p-2.5 pl-0 flex-row gap-2'>
                                    <View className='flex-row gap-1 items-center justify-center'>
                                        <Entypo name="login" size={24} color={Colors.light.text} />
                                        <Text className='text-xl' style={styles.login}>Login</Text>
                                    </View>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        height: 280,
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
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
    cardIcon: {
        flex: 1,
        alignItems: 'center',
    },
    cardDescription: {
        color:'green',
        textAlign: 'center'
    },
    cardTitle: {
        color: 'green',
        textAlign: 'center'
    },
    card: {
        backgroundColor: 'lightgreen',
        borderColor: Colors.light.green.drive
    },
    lottieAnimation: {
        width: '100%',
        alignSelf: 'flex-end',
        height: 250,
    },
    login: {
        color: Colors.light.text,  
    },
});


export default ChooseUserModeScreen;