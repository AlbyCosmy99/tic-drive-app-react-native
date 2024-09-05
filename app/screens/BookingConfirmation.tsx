import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function BookingConfirmation() {
    return (
        <>
            <TicDriveNavbar />
            <SafeAreaView style={styles.container} className="flex-1 justify-center items-center">
                <Text style={styles.success} className="font-extrabold text-center p-5 pt-0 text-3xl">Service booked successfully!</Text>
                <Text style={styles.success} className="font-extrabold text-center p-5 pt-0 text-3xl">Thank you for booking with TicDrive. You will soon receive a PIN code via email to present to the mechanic.</Text>
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
    }
})