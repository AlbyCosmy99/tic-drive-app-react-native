import TicDriveNavbar from "@/components/navigation/TicDriveNavbar";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function BookingConfirmation() {
    return (
        <>
            <TicDriveNavbar />
            <SafeAreaView style={styles.container}>
                <Text style={styles.success}>Service booked successfully!</Text>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    success: {
        color: Colors.light.green.drive,
        fontSize: 25,
        fontWeight: '800'
    }
})