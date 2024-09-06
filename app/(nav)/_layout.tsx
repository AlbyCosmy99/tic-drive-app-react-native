import TicDriveButton from "@/components/TicDriveButton";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ServicesCards from "@/components/ServicesCards";
import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import { Colors } from "@/constants/Colors";

export default function Nav() {
    const colorScheme = useColorScheme()

    const backgroundStyle = {
        backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.background
    }

    return (
        <SafeAreaView className="flex-1" style={backgroundStyle}>
            <TicDriveNavbar />
            <View style={colorScheme === 'light' ? {borderBottomColor: '#ededed'} : {}} className="flex-1 justify-between flex-1 border-b" >
                <LinearGradient
                    colors={colorScheme === 'light' ? ['#FFFFFF', '#FBFBFB'] : [Colors.dark.background, Colors.dark.background]}
                    className="flex-1"
                >
                    <Text style={colorScheme === 'light' ? {color:  Colors.light.text} : {color: Colors.dark.text}} className="font-medium text-3xl mx-3.5 mb-2">What service are you looking for?</Text>
                    <ServicesCards />
                </LinearGradient>
            </View>
            <TicDriveButton text="Book a service" path="/screens/RegisterVehicle"/>
        </SafeAreaView>
    );
}
