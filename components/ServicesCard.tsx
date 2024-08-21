import React, { useContext, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Button, Card, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from 'react-native';
import servicesContext from "@/app/stateManagement/contexts/servicesContext";

interface ServicesCardProps {
    id: number;
}

function ServicesCard({id}: ServicesCardProps) {
    const [isPressed, setIsPressed] = useState(false);
    const {servicesState, setServicesState} = useContext(servicesContext)

    useEffect(() => {
        if(servicesState.servicePressed === id) {
            setIsPressed(true)
        }
        else {
            setIsPressed(false)
        }
    }, [servicesState])

    const handlePressIn = () => {
        if(servicesState.servicePressed === id) { //true if the service is already pressed
            setIsPressed(false)
            setServicesState({
                servicePressed: -1
            })
        }
        else {
            setIsPressed(true);
            setServicesState({
                servicePressed: id
            })
        }
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
        >
            <Card containerStyle={[styles.card, isPressed && styles.pressedCard]}>
                <View>
                    <Text>icon</Text>
                    <Text>icon2</Text>
                </View>
                <Text>adjective</Text>
                <Text>
                    well meaning and kindly.
                    {'"a benevolent smile"'}
                </Text>
            </Card>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 15,
        marginHorizontal: 7,
        borderRadius: 15,
        padding: 15,
        elevation: 1,
        borderWidth: 1,
    },
    pressedCard: {
        borderColor: Colors.green.drive,
    }
});

export default ServicesCard;
