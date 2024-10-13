import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";;
import { globalStyles } from "../globalStyles";
import { Colors } from "@/constants/Colors";
import { Image } from "@rneui/themed";
import TicDriveLogo from '../../assets/images/TicDriveLogo.jpeg';
import LottieView from 'lottie-react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../stateManagement/redux/hooks";
import { StackActions, useNavigation } from "@react-navigation/native";
import ServicesCard from "@/components/ServicesCard";
import Feather from '@expo/vector-icons/Feather';
import CarRepairService from '../../assets/svg/carRepairService.svg'
import { MotiView } from 'moti'
import { useState } from "react";
import { Dimensions } from 'react-native';
import smallDevicebreakpointHeight from "@/constants/smallDevicebreakpointHeight";
import TicDriveAuthButton from "@/components/ui/buttons/TicDriveAuthButton";

const { width, height } = Dimensions.get('window');

const LandingScreen = () => {
    const navigation = useNavigation()
    const isUserLogged = useAppSelector((state) => state.auth.isAuthenticated)
    const [isSearchButtonPressed, setIsSearchButtonPressed] = useState(false);
    const [isOfferButtonPressed, setIsOfferButtonPressed] = useState(false);

    return (
        <View className={`flex-1 bg-white`}>
            <LinearGradient
                colors={[Colors.light.backgroundLinearGradient.start,Colors.light.backgroundLinearGradient.start, Colors.light.green.drive]}
                locations={[0, 0.45, 1]} 
                className="flex-1 absolute w-full h-full"
            >
                <View className="flex-1 justify-between" style={globalStyles().safeAreaView}>
                    <View>
                        <View style={{height: 60}} className='justify-end flex-row mx-5'>
                            {isUserLogged ? (
                                    <TicDriveAuthButton 
                                        action="logout"
                                    />
                                ) : (
                                    <TicDriveAuthButton 
                                        onPress={() => {
                                            if(navigation.canGoBack()) {
                                                navigation.dispatch(StackActions.popToTop());
                                            }
                                            router.push('/screens/UserAuthentification')
                                        }}
                                        action="login"
                                    />
                                )
                            }
                        </View>
                        <View className="items-center justify-center">
                            <Image 
                                source={TicDriveLogo}
                                style={styles.logoImage}
                            />
                        </View>
                    </View>
                    <View>
                        <LottieView
                            source={require('@/assets/json/animations/ticDriveAnimation2.json')}
                            autoPlay
                            loop
                            style={styles.lottieAnimation}
                        />
                    </View>
                    <LinearGradient
                        colors={[Colors.light.backgroundLinearGradient.start, Colors.light.green.drive, Colors.light.green.drive]} // Define your gradient colors here
                        style={styles.content} 
                        locations={[0, 0.4, 1]}
                        className="p-2 items-end justify-center flex-1"
                    >
                        <MotiView
                            className="flex-row justify-center items-center p-2"
                            from={{
                                scale: 0.8,
                            }}
                            animate={{
                                scale: 1,
                            }}
                            transition={{
                                type: 'timing',
                                duration: 150,
                            }}
                        >
                            <MotiView 
                                className="flex-1" 
                                from={{
                                    scale: 0.8,
                                }}
                                animate={{
                                    scale: isSearchButtonPressed ? 0.95 : 1,
                                }}
                                transition={{
                                    type: 'timing',
                                    duration: 150,
                                }}
                            >
                                <TouchableWithoutFeedback
                                        onPressIn={() => setIsSearchButtonPressed(true)}
                                        onPressOut={() => setIsSearchButtonPressed(false)}
                                        onPress={()=> router.push("/screens/ChooseServicesScreen?category=user")}
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
                                        icon={() => <Feather 
                                            name="search" 
                                            size={height > smallDevicebreakpointHeight ? 50 : 40} 
                                            color={'green'}
                                        />}
                                        disabledPressIn={true}
                                    />
                                </TouchableWithoutFeedback>
                            </MotiView>
                            <MotiView 
                                className="flex-1"
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
                                    onPress={()=> router.push("/screens/ChooseServicesScreen?category=workshop")}
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
                                        icon={() => 
                                            <CarRepairService 
                                                width={height > smallDevicebreakpointHeight ? 50 : 40} 
                                                height={height > smallDevicebreakpointHeight ? 50 : 40} 
                                                fill={'green'}
                                            />
                                        }
                                        disabledPressIn={true}
                                    />
                                </TouchableWithoutFeedback>
                            </MotiView>
                        </MotiView>
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
        width: height > smallDevicebreakpointHeight ? 180 : 150 ,
        height: height > smallDevicebreakpointHeight ? 180 : 150,
        resizeMode: 'contain',
    },
    cardIcon: {
        flex: 1,
        alignItems: 'center',
    },
    cardDescription: {
        color: 'green',
        textAlign: 'center'
    },
    cardTitle: {
        color: 'green',
        textAlign: 'center'
    },
    card: {
        backgroundColor: 'lightgreen',
        borderColor: Colors.light.green.drive,
    },
    lottieAnimation: {
        width: '100%',
        alignSelf: 'flex-end',
        height: 200
    },
});


export default LandingScreen;