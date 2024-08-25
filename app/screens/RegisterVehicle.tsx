import TicDriveButton from "@/components/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import {router} from 'expo-router'
import SegmentedControl from "@/components/SegmentedControl";
import TicDriveInput from "@/components/TicDriveInput";
import { useEffect, useState } from "react";
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
    const [carSelected, setCarSelected] = useState(
        {
            id: 0,
            liters: 0,
            energy: "",
            engineCode: "",
            enginePower: 0,
            engineDisplacement: 0,
            vin: "",
            plateNumber: "",
            model: ""
        }
    )
    const [carNotFound, setCarNotFound] = useState(false)
    useEffect(() => {
        if(carSelected.id === -1) {
            setCarNotFound(true)
        }
        else {
            setCarNotFound(false)
        }
    },[carSelected])

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={30} color="#000" />
            </TouchableOpacity>
            <View style={styles.contentContainer}>
                <Text style={styles.headerText}>Register your vehicle for service bookings</Text>
                <SegmentedControl segmentedControlSelection={segmentedControlSelection} setSegmentedControlSelection={setSegmentedControlSelection} />
                <View style={styles.bookingDetailsContainer}>
                    {
                        options.map((option,index) => {
                            return segmentedControlSelection.name === option.name &&
                                (
                                    <View key={index}>
                                        <Text style={styles.plateNumberLabel} key={index}>{option.inputLabel}</Text>
                                        <TicDriveInput 
                                            placeholder={option.placeholder} 
                                            isRightIcon={true} 
                                            setCarSelected={setCarSelected}
                                            option={option.keyString}
                                        />
                                        {carNotFound && <Text style={styles.carNotFound}>Car not found. Try again.</Text>}
                                    </View>
                                    
                                )
                        })
                    }
                    <ScrollView>
                        {
                            carSelected.id > 0 && (
                                <View style={styles.carDetailsContainer}>
                                    <View style={styles.carDetailContainer}>
                                        <Text style={[styles.carLabel]}>Model</Text>
                                        <Text style={styles.carDetail}>{carSelected.model}</Text>
                                    </View>
                                    <View style={styles.carDetailContainer}>
                                        <Text style={[styles.carLabel]}>Plate number</Text>
                                        <Text style={styles.carDetail}>{carSelected.plateNumber}</Text>
                                    </View>
                                    <View style={styles.carDetailContainer}>
                                        <Text style={[styles.carLabel]}>VIN</Text>
                                        <Text style={styles.carDetail}>{carSelected.vin}</Text>
                                    </View>
                                    <View style={styles.carDetailContainer}>
                                        <Text style={[styles.carLabel]}>Liters</Text>
                                        <Text style={styles.carDetail}>{carSelected.liters}</Text>
                                    </View>
                                    <View style={styles.carDetailContainer}>
                                        <Text style={[styles.carLabel]}>Energy</Text>
                                        <Text style={styles.carDetail}>{carSelected.energy}</Text>
                                    </View>
                                    <View style={styles.carDetailContainer}>
                                        <Text style={[styles.carLabel]}>Engine code</Text>
                                        <Text style={styles.carDetail}>{carSelected.engineCode}</Text>
                                    </View>
                                    <View style={styles.carDetailContainer}>
                                        <Text style={[styles.carLabel]}>Engine displacement (cc)</Text>
                                        <Text style={styles.carDetail}>{carSelected.engineDisplacement}</Text>
                                    </View>
                                </View>
                            )
                        }     
                    </ScrollView>                
                </View> 
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
        borderRadius: 10,
    },
    plateNumberLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginHorizontal: 15,
        marginTop: 15,
        marginBottom: 0
    },
    carDetailsContainer: {
        marginHorizontal: 15
    },
    carDetail: {
        fontSize: 18,
        marginBottom:5
    },
    carLabel: {
        fontWeight: '700',
        fontSize: 18,
        marginBottom: 2
    },
    carDetailContainer: {
        marginBottom: 3,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.SegmentedControlBackground,
        marginTop: 3
    },
    carNotFound: {
        marginHorizontal: 'auto',
        fontSize: 16,
        color: 'red'
    }
});

export default RegisterVehicle;