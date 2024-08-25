import React from "react";
import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Image } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Entypo } from "@expo/vector-icons";
import LocationPin from '../assets/svg/location_on.svg'
import Verified from '../assets/svg/verified.svg'
import Star from '../assets/svg/star.svg'
import Acute from '../assets/svg/acute.svg'
import FreeCancellation from '../assets/svg/free_cancellation.svg'
import AssistantDirection from '../assets/svg/assistant_direction'
import CalendarIcon from '../assets/svg/calendar_add_on.svg'

const service = {
    id: 5,
    title: 'Full Car Maintenance Package',
    imageUrl: 'https://prodiags.com/wp-content/uploads/2021/01/Korjaamopaallikko_Tyontekijat_1000X341.jpg',
    favourite: true,
    position: 'San Francisco, USA',
    stars: 4.8,
    reviews: [
    {
        stars: 5,
        text: 'Top-notch service! My car runs smoothly now.',
        authorName: 'Linda Grey',
        authorImageUrl: 'https://example.com/lindagrey.jpg',
        when: new Date('2023-08-20'),
    },
    {
        stars: 4,
        text: 'Great experience, but had to wait a bit longer than expected.',
        authorName: 'Tom Brown',
        authorImageUrl: 'https://example.com/tombrown.jpg',
        when: new Date('2023-08-10'),
    },
    ],
    freeCancellation: true,
    price: '$180',
    discount: 20,
    freeService: 'Free oil change',
    verified: true
}

const calculateDiscountPrice = (price: string, discount: number) => {
    const priceValue = parseInt(price.slice(1))
    return priceValue - priceValue*discount/100
}

function WorkshopCard() {
    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Image
                    source={{uri: service.imageUrl}}
                    containerStyle={styles.image}
                    PlaceholderContent={<ActivityIndicator size="large" color={Colors.light.bookingsOptionsText} />}
                />
                {
                    service.favourite ? (
                        <Icon name="heart" size={30} color="red" style={styles.heartIcon} />
                    ) : (<Icon name="heart" size={30} color="white" style={styles.heartIcon} />)
                }
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{service.title}</Text>
                    {service.verified && <Verified width={24} name="verified" />}
                </View>
                <View style={styles.servicePositionContainer}>
                    <LocationPin width={24} name="location-pin" fill={Colors.light.ticText}/>
                    <Text style={styles.serviceInfo}>{service.position}</Text>
                </View>
                <View style={styles.servicePositionContainer}>
                    <Star width={24} name="location-pin" fill={Colors.light.ticText}/>
                    <Text style={styles.serviceInfo}>{service.stars} ({service.reviews.length} reviews)</Text>
                </View>
                <View style={styles.extraServicesContainer}>
                    <View style={styles.expressServiceContainer}>
                        <Acute width={24} name="acute"/>
                        <Text style={styles.extraService}>Express service</Text>
                    </View>
                    {service.freeCancellation && (
                        <View style={styles.expressServiceContainer}>
                            <FreeCancellation width={24} name="acute"/>
                            <Text style={styles.extraService}>Free cancellation</Text>
                        </View>
                    )}
                </View>
                <View style={styles.priceContainer}>
                    <View>
                        <Text style={[styles.priceDetail, service.discount!==0 && styles.priceWithDiscount]}>{service.price}</Text>
                        {service.discount !==0 && <View style={styles.strikethroughLine} />}
                    </View>
                    {service.discount !== 0 && <Text style={styles.priceDetail}>${calculateDiscountPrice(service.price, service.discount)}</Text>}
                </View>
                <View style={styles.cardOptionsContainer}>
                    <View style={styles.cardOptionContainer}>
                        <AssistantDirection width={24} />
                        <Text style={styles.cardOption}>Directions</Text>
                    </View>
                    <View style={styles.cardOptionContainer}>
                        <CalendarIcon width={24} />
                        <Text style={styles.cardOption}>Check availability</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: Colors.light.SegmentedControlBackground,
        borderBottomWidth: 2,
        paddingBottom: 15
    },
    cardContainer: {
        position: 'relative',
        width: '100%'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15,
    },
    heartIcon: {
        position: 'absolute',
        top: 20,
        right: 25,
        zIndex: 1,
    },
    servicePositionContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginTop: 10
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginTop: 8
    },
    title: {
        fontSize: 22,
        fontWeight:'700'
    },
    serviceInfo: {
        fontSize: 16,
        color: Colors.light.placeholderText
    },
    expressServiceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'center',
        gap: 3,
    },
    extraServicesContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10
    },
    extraService: {
        fontSize: 18
    },
    priceContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
        marginTop: 10
    },
    priceDetail: {
        fontSize: 22,
        fontWeight: '700'
    },
    strikethroughLine: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'red',
    },
    priceWithDiscount: {
        color: 'red'
    },
    cardOptionContainer: {
        flexDirection: 'row',
        alignItems:'center',
        gap: 2,
        borderWidth: 1,
        borderColor: Colors.light.green.drive,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 50
    },
    cardOption: {
        fontWeight: '500',
        fontSize: 16
    },
    cardOptionsContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        marginTop: 10
    }
});

export default WorkshopCard;
