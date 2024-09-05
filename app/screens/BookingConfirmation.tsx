import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function BookingConfirmation() {
    return (
        <>
            <TicDriveNavbar />
            <SafeAreaView style={styles.container} className="flex-1 justify-center items-center">
                <Text style={styles.success}>Service booked successfully!</Text>
                <Text style={styles.success}>Thank you for booking with TicDrive. You will soon receive a PIN code via email to present to the mechanic.</Text>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
    },
    success: {
        color: Colors.light.ticText,
        fontSize: 25,
        fontWeight: '800',
        textAlign:'center',
        padding:20,
        paddingTop: 0
    }
})