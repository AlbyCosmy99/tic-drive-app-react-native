import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ServicesCard from './ServicesCard';
import { StyleSheet, View } from 'react-native';
import servicesContext from '@/app/stateManagement/contexts/servicesContext';

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

    useEffect(() => {
        fetch("https://669ae4f09ba098ed610102d8.mockapi.io/api/v1/ticDrive/services")
        .then(res => res.json())
        .then(res => {
           setServices(res)
        })
    }, [])
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
    }
});

export default ServicesCards;
