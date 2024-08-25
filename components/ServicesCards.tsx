import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ServicesCard from './ServicesCard';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';

interface Service {
    id: number;
    title: string;
    description: string;
  }

function ServicesCards() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://669ae4f09ba098ed610102d8.mockapi.io/api/v1/ticDrive/services")
        .then(res => res.json())
        .then(res => {
           setServices(res)
           setLoading(false)
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
