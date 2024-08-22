import React, { useContext, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Card, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from 'react-native';
import servicesContext from "@/app/stateManagement/contexts/servicesContext";

interface ServicesCardProps {
    id: number;
    title: string,
    description: string,
}

function ServicesCard({id, title, description}: ServicesCardProps) {
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
                <View style={styles.cardIcons}>
                    <Text>icon1</Text>
                    <Text>icon2</Text>
                </View>
                <Text style={styles.serviceTitle}>{title}</Text>
                <Text style={styles.serviceDesc} numberOfLines={4} ellipsizeMode="tail">
                    {description}
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
        height: 160
    },
    pressedCard: {
        borderColor: Colors.green.drive,
    },
    cardIcons: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 5
    },
    serviceTitle: {
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 10
    },
    serviceDesc: {
        opacity: 0.6,
        marginBottom: 25,
        fontSize:12
    }
});

export default ServicesCard;
