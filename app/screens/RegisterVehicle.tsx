import TicDriveButton from "@/components/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import {router} from 'expo-router'
function RegisterVehicle() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Text style={styles.headerText}>Register your vehicle for service bookings</Text>
            </View>
            <View>
                
            </View>
            <TicDriveButton text="Confirm"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerText: {
        fontWeight: '500',
        fontSize: 30,
        marginHorizontal: 15,
        marginBottom: 8,
    },
    backButton: {
        margin: 8,
        marginBottom: 30,
    }
});

export default RegisterVehicle;