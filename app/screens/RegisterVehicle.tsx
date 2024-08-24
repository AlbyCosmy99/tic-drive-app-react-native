import TicDriveButton from "@/components/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import {router} from 'expo-router'
import SegmentedControl from "@/components/SegmentedControl";
import TicDriveInput from "@/components/TicDriveInput";
import { useState } from "react";
import options from '../../constants/VehicleRegistrationOptions';

function RegisterVehicle() {
    const [segmentedControlSelection, setSegmentedControlSelection] = useState(
        {
            index: 0,
            name: "Licence Plate",
            placeholder: "E.g. AA123BB",
            inputLabel: "Plate number"
        }
    )
    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Text style={styles.headerText}>Register your vehicle for service bookings</Text>
                <SegmentedControl segmentedControlSelection={segmentedControlSelection} setSegmentedControlSelection={setSegmentedControlSelection} />
                {
                    options.map((option,index) => {
                        return segmentedControlSelection.name === option.name &&
                            (
                                <View style={styles.bookingDetailsContainer} key={index}>
                                    <Text style={styles.plateNumberLabel}>{option.inputLabel}</Text>
                                    <View>
                                        <TicDriveInput placeholder={option.placeholder} isRightIcon={true} />
                                    </View>
                                </View> 
                            )
                    })
                }
            </View>
            <TicDriveButton text="Confirm" path="../(tabs)/Home" />
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
    },
    bookingDetailsContainer: {
        flex:1,
        backgroundColor: Colors.light.background,
        margin: 15,
        borderColor: Colors.light.SegmentedControlBackground,
        borderWidth: 2,
        borderRadius: 10
    },
    plateNumberLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 0
    },
});

export default RegisterVehicle;