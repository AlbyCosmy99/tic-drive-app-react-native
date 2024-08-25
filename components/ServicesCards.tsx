import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ServicesCard from './ServicesCard';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import servicesContext from '@/app/stateManagement/contexts/servicesContext';
import { Colors } from '@/constants/Colors';

interface Service {
    id: number;
    title: string;
    description: string;
  }

function ServicesCards() {
    const [servicesState, setServicesState] = useState({
        servicePressed: -1
    })
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://669ae4f09ba098ed610102d8.mockapi.io/api/v1/ticDrive/services")
        .then(res => res.json())
        .then(res => {
           setServices(res)
           setLoading(true)
        })
    }, [])
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={Colors.light.bookingsOptionsText}/>
            </View>
        )
    }

    return (
        <servicesContext.Provider value={{servicesState, setServicesState}}>
            <ScrollView contentContainerStyle={styles.container}>
                {services.map((elem, index) => (
                    <View key={index} style={styles.cardContainer}>
                        <ServicesCard 
                            id={elem.id} 
                            title={elem.title} 
                            description={elem.description} 
                        />
                    </View>
                ))}
            </ScrollView>
        </servicesContext.Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 7
    },
    cardContainer: {
        width: '50%', 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ServicesCards;
