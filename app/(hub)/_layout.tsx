import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../globalStyles";
import { Colors } from "@/constants/Colors";
import necessaryDeviceBottomInset from "../utils/necessaryDeviceBottomInset";
import { Image } from "@rneui/themed";
import TicDriveLogo from '../../assets/images/TicDriveLogo.jpeg';
import ServicesCard from "@/components/ServicesCard";

const ChooseUserModeScreen = () => {
    return (
        <View className={`flex-1 ${necessaryDeviceBottomInset()}`}>
            <LinearGradient
                colors={[Colors.light.backgroundLinearGradient.start,Colors.light.backgroundLinearGradient.start, Colors.light.green.drive]}
                locations={[0, 0.45, 1]} 
                className="flex-1 absolute w-full h-full"
            />
                <SafeAreaView className="flex-1" style={globalStyles.safeAreaView}>
                    <View className="flex-1 justify-between">
                        <View className="justify-center items-center flex-1">
                            <Image 
                                source={TicDriveLogo}
                                style={styles.logoImage}
                            />
                        </View>
                        <View style={styles.content} className="flex-row bg-green-500 justify-center items-center p-2">
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
                                    id={1} 
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
                    </View>
                </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        height: 280
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
    }
});


export default ChooseUserModeScreen;