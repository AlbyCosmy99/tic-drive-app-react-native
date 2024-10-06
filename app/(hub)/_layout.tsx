import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";;
import { globalStyles } from "../globalStyles";
import { Colors } from "@/constants/Colors";
import { Image } from "@rneui/themed";
import TicDriveLogo from '../../assets/images/TicDriveLogo.jpeg';
import LottieView from 'lottie-react-native'
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../stateManagement/redux/hooks";
import { logout } from "../stateManagement/redux/slices/authSlice";
import { saveLoginStatus } from "../utils";
import { Entypo } from "@expo/vector-icons";
import { StackActions, useNavigation } from "@react-navigation/native";
import ServicesCard from "@/components/ServicesCard";
import Feather from '@expo/vector-icons/Feather';
import CarRepairService from '../../assets/svg/carRepairService.svg'
import { MotiView } from 'moti'
import { useState } from "react";
import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";

const ChooseUserModeScreen = () => {

    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const isUserLogged = useAppSelector((state) => state.auth.isAuthenticated)
    const [isSearchButtonPressed, setIsSearchButtonPressed] = useState(false);
    const [isOfferButtonPressed, setIsOfferButtonPressed] = useState(false);

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
                <View className="flex-1 justify-between" style={globalStyles().safeAreaView}>
                    <View className='justify-end flex-row mx-3'>
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
                                    router.push('/screens/UserAuthentification')
                                }} className='p-2.5 pl-0 flex-row gap-2'>
                                    <View className='flex-row gap-1 items-center justify-center'>
                                        <Entypo name="login" size={24} color={Colors.light.text} />
                                        <Text className='text-xl' style={styles.login}>Login</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <View className="items-center justify-center">
                        <Image 
                            source={TicDriveLogo}
                            style={styles.logoImage}
                        />
                    </View>
                    <View>
                        <LottieView
                            source={require('@/assets/json/animations/ticDriveAnimation.json')}
                            autoPlay
                            loop
                            style={styles.lottieAnimation}
                        />
                    </View>
                    <LinearGradient
                        colors={[Colors.light.backgroundLinearGradient.start, Colors.light.green.drive, Colors.light.green.drive]} // Define your gradient colors here
                        style={styles.content} 
                        locations={[0, 0.4, 1]}
                        className="p-2 items-end justify-center"
                    >
                        <View className="flex-row justify-center items-center p-2">
                            <View className="flex-1">
                                <MotiView
                                    from={{
                                        scale: 0.8,
                                    }}
                                    animate={{
                                        scale: isSearchButtonPressed ? 0.95 : 1,
                                    }}
                                    transition={{
                                        type: 'timing',
                                    }}
                                >
                                    <TouchableWithoutFeedback
                                        onPressIn={() => setIsSearchButtonPressed(true)}
                                        onPressOut={() => setIsSearchButtonPressed(false)}
                                        onPress={()=> router.push("/screens/ChooseServicesScreen")}
                                        onLongPress={() => alert('long press')}
                                    >
                                        <ServicesCard 
                                            id={1} 
                                            title="Search a service" 
                                            description="What service are you looking for?"
                                            cardStyle={styles.card}
                                            titleStyle={styles.cardTitle}
                                            descriptionStyle={styles.cardDescription}
                                            iconStyle={styles.cardIcon}
                                            isCheckIconAvailable={false}
                                            icon={() => <Feather name="search" size={50} />}
                                            disabledPressIn={true}
                                        />
                                    </TouchableWithoutFeedback>
                                </MotiView>
                            </View>
                            <View className="flex-1">
                            <MotiView
                                from={{
                                    scale: 0.8,
                                }}
                                animate={{
                                    scale: isOfferButtonPressed ? 0.95 : 1,
                                }}
                                transition={{
                                    type: 'timing',
                                    duration: 150,
                                }}
                            >
                                <TouchableWithoutFeedback
                                    onPressIn={() => setIsOfferButtonPressed(true)}
                                    onPressOut={() => setIsOfferButtonPressed(false)}
                                    onPress={() => alert('Service offering pressed')}
                                    onLongPress={() => alert('Service offering long pressed')}
                                >
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
                                        icon={() => <CarRepairService width={50} height={50} />}
                                    />
                                </TouchableWithoutFeedback>
                            </MotiView>
                            </View>
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
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    cardIcon: {
        flex: 1,
        alignItems: 'center',
    },
    cardDescription: {
        color: 'black',
        textAlign: 'center'
    },
    cardTitle: {
        color: 'black',
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