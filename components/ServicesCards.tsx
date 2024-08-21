import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ServicesCard from './ServicesCard';
import { StyleSheet, View } from 'react-native';
import servicesContext from '@/app/stateManagement/contexts/servicesContext';
const arr = [1, 1, 1, 1, 1, 1];

function ServicesCards() {
    const [servicesState, setServicesState] = useState({
        servicePressed: -1
    })
    return (
        <servicesContext.Provider value={{servicesState, setServicesState}}>
            <ScrollView contentContainerStyle={styles.container}>
                {arr.map((elem, index) => (
                    <View key={index} style={styles.cardContainer}>
                        <ServicesCard id={index}/>
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
