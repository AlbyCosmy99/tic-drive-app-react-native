import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import Star from '../assets/svg/star.svg'
import { Image } from "@rneui/themed";
import Review from '../constants/temp/Review'

type ClientReviewCardProps = {
    review: Review;
};

export default function ClientReviewCard({review}: ClientReviewCardProps) {
    const calculateTimeFromReview = (when: Date) => {
        const days = (Date.now() - when.getTime()) / (1000 * 60 * 60 * 24)
        if(days < 30) return Math.floor(days) + " days ago"
        if(days < 365) return Math.floor(days/30) + " months ago"
        const years = Math.floor(days/365) 
        return years + (years === 1 ? " year" : " years") + " ago"

    }

    return (
        <View style={styles.reviewContainer}>
            <View style={styles.clientDetailsContainer}>
                <View style={styles.clientDetails}>
                    <View>
                        <Image 
                            source={{uri: review.authorImageUrl}}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.nameWhenContainer}>
                        <Text style={styles.authorName}>{review.authorName}</Text>
                        <Text style={styles.when}>{calculateTimeFromReview(review.when)}</Text>

                    </View>
                </View>
                <View style={styles.servicePositionContainer}>
                    <Star width={24} name="location-pin" fill={Colors.light.ticText}/>
                    <Text style={styles.serviceInfo}>{review.stars}</Text>
                </View>
            </View>
            <View style={styles.reviewTextContainer}>
                <Text style={styles.reviewText}>{review.text}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    reviewContainer: {
        flex: 1,
        marginTop: 20,
        borderTopWidth: 2,
        borderTopColor: '#ebebeb',
        paddingTop: 15
    },
    servicePositionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginTop: 10
    },
    serviceInfo: {
        fontSize: 18,
    },
    clientDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clientDetails: {
        flexDirection: 'row'
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 50
    },
    authorName: {
        fontWeight: '500',
        fontSize: 16
    },
    when: {
        fontSize: 15,
        color: Colors.light.placeholderText
    },
    nameWhenContainer: {
        justifyContent: 'center',
        marginLeft: 10
    },
    reviewTextContainer: {
        marginTop: 10,
        color: Colors.light.placeholderText
    },
    reviewText: {
        color: Colors.light.ticText
    }
})