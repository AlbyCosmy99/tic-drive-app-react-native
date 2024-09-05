import TicDriveButton from "@/components/TicDriveButton";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ServicesCards from "@/components/ServicesCards";
import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import { Colors } from "@/constants/Colors";

export default function Nav() {
    return (
        <SafeAreaView className="flex-1">
            <TicDriveNavbar />
            <View style={styles.contentContainer} className="flex-1 justify-between	flex-1 border-b" >
                <LinearGradient
                    colors={['#FFFFFF', '#FBFBFB']}
                    style={styles.content}
                >
                    <Text style={styles.headerText}>What service are you looking for?</Text>
                    <ServicesCards />
                </LinearGradient>
            </View>
            <TicDriveButton text="Book a service" path="/screens/RegisterVehicle"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: Colors.light.background,
    },
    contentContainer: {
        borderBottomColor: '#ededed',
    },
    content: {
        flex: 1,
    },
    headerText: {
        fontWeight: '500',
        fontSize: 30,
        marginHorizontal: 15,
        marginBottom: 8,
    }
});
