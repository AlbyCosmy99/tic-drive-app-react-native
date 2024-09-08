import TicDriveButton from "@/components/TicDriveButton";
import { Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ServicesCards from "@/components/ServicesCards";
import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import { Colors } from "@/constants/Colors";

export default function Nav() {
    const colorScheme = useColorScheme();

    return (
        <View className="flex-1">
            <LinearGradient
                colors={[Colors.light.backgroundLinearGradient.start, Colors.light.backgroundLinearGradient.end]}
                className="flex-1 absolute w-full h-full"
            />
                <SafeAreaView className="flex-1">
                    <TicDriveNavbar />
                    <View className="flex-1 justify-between">
                        <Text style={{ color: colorScheme === 'light' ? Colors.light.text : Colors.dark.text }} className="font-medium text-3xl mx-3.5 mb-2">
                            What service are you looking for?
                        </Text>
                        <ServicesCards />
                    </View>
                    <TicDriveButton text="Book a service" path="/screens/RegisterVehicle" />
                </SafeAreaView>
        </View>
    );
}
