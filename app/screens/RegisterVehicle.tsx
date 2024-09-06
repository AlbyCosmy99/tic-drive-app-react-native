import TicDriveButton from "@/components/TicDriveButton";
import { Colors } from "@/constants/Colors";
import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import {router} from 'expo-router'
import SegmentedControl from "@/components/SegmentedControl";
import TicDriveInput from "@/components/TicDriveInput";
import { useContext, useEffect, useState } from "react";
import options from '../../constants/VehicleRegistrationOptions';
import GlobalContext from "../stateManagement/contexts/GlobalContext";

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
    const {carNotFound, setCarNotFound} = useContext(GlobalContext)
    const [isCarSearched, setIsCarSearched] = useState(false)

    const colorScheme = useColorScheme()

    const backgroundStyle = {
        backgroundColor: colorScheme === 'light' ? Colors.light.backgroundLinearGradient.end : Colors.dark.background
    }

    useEffect(() => {
        if(carSelected.id === 0) {
            setCarNotFound(true)
        }
        else {
            setCarNotFound(false)
        }
    },[carSelected])

    return (
        <SafeAreaView style={backgroundStyle} className="flex-1">
            <TouchableOpacity onPress={() => router.back()} className="m-2 mb-7">
                  <Ionicons name="arrow-back" size={30} color={colorScheme === 'light' ? '#000' : '#fff'} />
            </TouchableOpacity>
            <View className="flex-1 justify-between">
                <Text style={colorScheme === 'light' ? 
                    {color:  Colors.light.text} : 
                    {color: Colors.dark.text}} className="font-medium mb-2 text-3xl mx-3.5">Register your vehicle for service bookings</Text>
                <SegmentedControl segmentedControlSelection={segmentedControlSelection} setSegmentedControlSelection={setSegmentedControlSelection} />
                <View style={styles.bookingDetailsContainer} className="flex-1 m-3.5 border-2 rounded-xl">
                    {
                        options.map((option,index) => {
                            return segmentedControlSelection.name === option.name &&
                                (
                                    <View key={index}>
                                        <Text className="font-semibold mx-3.5 mt-3.5 mb-0 text-lg" key={index}>{option.inputLabel}</Text>
                                        <TicDriveInput 
                                            placeholder={option.placeholder} 
                                            isRightIcon={true} 
                                            setCarSelected={setCarSelected}
                                            option={option.keyString}
                                            setIsCarSearched={setIsCarSearched}
                                        />
                                        {carNotFound && isCarSearched && <Text className="text-base mx-auto text-red-600">Car not found. Try again.</Text>}
                                    </View>
                                    
                                )
                        })
                    }
                    <ScrollView>
                        {
                            carSelected.id > 0 && (
                                <View className="mx-3.5">
                                    <View className="my-1 border-b" style={styles.carDetailContainer}>
                                        <Text className="font-bold mb-0.5 text-lg">Model</Text>
                                        <Text className="text-lg mb-1.5">{carSelected.model}</Text>
                                    </View>
                                    <View className="my-1 border-b" style={styles.carDetailContainer}>
                                        <Text className="font-bold mb-0.5 text-lg">Plate number</Text>
                                        <Text className="text-lg mb-1.5">{carSelected.plateNumber}</Text>
                                    </View>
                                    <View className="my-1 border-b" style={styles.carDetailContainer}>
                                        <Text className="font-bold mb-0.5 text-lg">VIN</Text>
                                        <Text className="text-lg mb-1.5">{carSelected.vin}</Text>
                                    </View>
                                    <View className="my-1 border-b" style={styles.carDetailContainer}>
                                        <Text className="font-bold mb-0.5 text-lg">Liters</Text>
                                        <Text className="text-lg mb-1.5">{carSelected.liters}</Text>
                                    </View>
                                    <View className="my-1 border-b" style={styles.carDetailContainer}>
                                        <Text className="font-bold mb-0.5 text-lg">Energy</Text>
                                        <Text className="text-lg mb-1.5">{carSelected.energy}</Text>
                                    </View>
                                    <View className="my-1 border-b" style={styles.carDetailContainer}>
                                        <Text className="font-bold mb-0.5 text-lg">Engine code</Text>
                                        <Text className="text-lg mb-1.5">{carSelected.engineCode}</Text>
                                    </View>
                                    <View className="my-1 border-b" style={styles.carDetailContainer}>
                                        <Text className="font-bold mb-0.5 text-lg">Engine displacement (cc)</Text>
                                        <Text className="text-lg mb-1.5">{carSelected.engineDisplacement}</Text>
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
    bookingDetailsContainer: {
        backgroundColor: Colors.light.background,
        borderColor: Colors.light.SegmentedControlBackground,
    },
    carDetailContainer: {
        borderBottomColor: Colors.light.SegmentedControlBackground,
    },
});

export default RegisterVehicle;