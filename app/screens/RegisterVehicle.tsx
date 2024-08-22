import { StyleSheet, Text, View } from "react-native";

function RegisterVehicle() {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headerText}>Register your vehicle for service bookings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        fontWeight: '500',
        fontSize: 30,
        marginHorizontal: 15,
        marginBottom: 8,
    }
});

export default RegisterVehicle;