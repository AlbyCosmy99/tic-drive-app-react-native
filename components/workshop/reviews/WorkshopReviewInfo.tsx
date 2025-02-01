import { Colors } from "@/constants/Colors"
import { WorkshopMini } from "@/types/workshops/Workshop"
import { StyleSheet, Text, View } from "react-native"
import Star from '../../../assets/svg/star.svg';

interface WorkshopReviewinfoProps {
    meanStars?: WorkshopMini['meanStars'],
    numberOfReviews?: WorkshopMini['numberOfReviews']
}
const WorkshopReviewinfo: React.FC<WorkshopReviewinfoProps> = ({meanStars,numberOfReviews }) => {
    const maxReview = 5
    
    return (
        meanStars && numberOfReviews && (
            <View style={styles.servicePositionContainer}>
              <Star
                width={24}
                name="location-pin"
                fill={Colors.light.ticText}
              />
              <Text className="text-sm" style={styles.serviceInfo}>
                {meanStars}/{maxReview} ({numberOfReviews} {numberOfReviews !== 1 ? 'reviews' : 'review'})
              </Text>
            </View>
        )
    )
}

const styles = StyleSheet.create({
    servicePositionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        marginTop: 10,
    },
    serviceInfo: {
        color: Colors.light.placeholderText,
    },
})

export default WorkshopReviewinfo