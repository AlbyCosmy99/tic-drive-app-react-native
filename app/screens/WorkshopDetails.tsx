import { Colors } from "@/constants/Colors";
import workshops, { Workshop } from "@/constants/temp/Workshops";
import { Image } from "@rneui/themed";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import LocationPin from '../../assets/svg/location_on.svg'
import Verified from '../../assets/svg/verified.svg'
import Star from '../../assets/svg/star.svg'
import Acute from '../../assets/svg/acute.svg'
import FreeCancellation from '../../assets/svg/free_cancellation.svg'
import AssistantDirection from '../../assets/svg/assistant_direction'
import CalendarIcon from '../../assets/svg/calendar_add_on.svg'
import Review from "@/constants/temp/Review";
import ChatIcon from '../../assets/svg/chat.svg'
import { Ionicons } from "@expo/vector-icons";
import TicDriveButton from "@/components/TicDriveButton";
import ClientReviewCards from "@/components/ClientReviewCards";

export default function WorkshopDetails() {
    const { id } = useLocalSearchParams();

    const [workshop, setWorkshop] = useState<Workshop | null>(null);

    useEffect(() => {
        setWorkshop(workshops.find(workshop => String(workshop.id) === id) || null);
    }, [id]);

    const calculateDiscountPrice = (price: string, discount: number) => {
        const priceValue = parseInt(price.slice(1))
        return priceValue - priceValue*discount/100
    }

    const calculateWorkshopStars = (reviews: Review[]) => {
        let sumReviewStars = 0
        reviews.forEach(review => {
            sumReviewStars += review.stars
        })
        return sumReviewStars/ reviews.length
    }

    if (!workshop) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-600 text-xl">Workshop not found.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} className="flex-1 p-2.5">
            <View style={styles.top}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
                <Text className="font-bold" style={styles.workshopText}>Workshop</Text>
                <View>
                    {
                        workshop.favourite ? (
                            <Icon name="heart" size={30} color="red" />
                        ) : (<Icon name="heart" size={30} color="white" />)
                    }
                </View>
            </View>
            <ScrollView>
                <View style={styles.container} className="flex-1 p-2.5">
                    <View className="w-full relative border-b-2" style={styles.cardContainer}>
                        <Image
                            source={{uri: workshop.imageUrl}}
                            containerStyle={styles.image}
                            PlaceholderContent={<ActivityIndicator size="large" color={Colors.light.bookingsOptionsText} />}
                        />
                        <View className="flex-1 flex-row items-center gap-0.5 mt-2">
                            <Text className="text-2xl font-bold">{workshop.title}</Text>
                            {workshop.verified && <Verified width={24} name="verified" />}
                        </View>
                        <View className="flex-1 flex-row mt-2.5">
                            <View className="flex-1 flex-row items-center gap-0.5">
                                <Acute width={24} name="acute"/>
                                <Text className="text-lg">Express service</Text>
                            </View>
                            {workshop.freeCancellation && (
                                <View className="flex-1 flex-row items-center gap-0.5">
                                    <FreeCancellation width={24} name="acute"/>
                                    <Text className="text-lg">Free cancellation</Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.cardOptionsContainer}>
                            <TouchableOpacity className="flex-row items-center gap-0.5 border" style={styles.cardOptionContainer} onPress={() => alert('directions')}>
                                <AssistantDirection width={24} />
                                <Text style={styles.cardOption}>Directions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center gap-0.5 border" style={styles.cardOptionContainer} onPress={()=> alert('check availability')}>
                                <CalendarIcon width={24} />
                                <Text style={styles.cardOption}>Check availability</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center gap-0.5 border" style={styles.cardOptionContainer} onPress={()=> alert('message')}>
                                <ChatIcon width={24} />
                                <Text style={styles.cardOption}>Message</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationLabel}>Location</Text>
                        <View className="flex-1 flex-row items-center gap-0.5 mt-2.5">
                            <LocationPin width={24} name="location-pin" fill={Colors.light.ticText}/>
                            <Text className="text-lg">{workshop.position}</Text>
                        </View>
                    </View>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationLabel}>What people say</Text>
                        <View className="flex-1 flex-row items-center gap-0.5 mt-2.5">
                            <Star width={24} name="location-pin" fill={Colors.light.ticText}/>
                            <Text className="text-lg">{calculateWorkshopStars(workshop.reviews)} ({workshop.reviews.length} reviews)</Text>
                        </View>
                        <ClientReviewCards id={Array.isArray(id) ? id[0] : id}/>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottom} className="flex-row justify-between items-center mx-2.5 border-t">
                <View className="flex-1 flex-col mt-2.5">
                    <Text style={styles.startingFrom}>Starting from</Text>
                    <View className="flex-row items-center">
                        <View>
                            <Text className={[
                                    workshop.discount !== 0 ? 'text-red-500' : '',
                                    'font-bold text-2xl mx-1'
                                ].join(' ')}>{workshop.price}</Text>
                            {workshop.discount !==0 && <View style={styles.strikethroughLine} />}
                        </View>
                        {workshop.discount !== 0 && <Text className="font-bold text-2xl mx-1">${calculateDiscountPrice(workshop.price, workshop.discount)}</Text>}
                    </View>
                </View>
                <View>
                    <TicDriveButton text="Book a service" path={'../screens/BookingConfirmation'} customButtonStyle={styles.customButtonStyle}/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light.background,
    },
    bottom: {
        borderTopColor: Colors.light.SegmentedControlBackground
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 12,
    },
    cardContainer: {
        borderBottomColor: Colors.light.SegmentedControlBackground,
    },
    strikethroughLine: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        height: 2,
        backgroundColor: 'red',
    },
    cardOptionContainer: {
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
        marginTop: 10,
        marginBottom: 15,
        flexWrap: 'wrap'
    },
    locationLabel: {
        fontSize: 20,
        fontWeight: '700'
    },
    locationContainer: {
        marginTop: 10
    },
    backButton: {
        margin: 8,
        marginBottom: 10,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
    },
    workshopText: {
        fontSize: 18,
    },
    startingFrom: {
        color: Colors.light.placeholderText,
        fontSize:18
    },
    customButtonStyle: {
        height: 50
    },
});
