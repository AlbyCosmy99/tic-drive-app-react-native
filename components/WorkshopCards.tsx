import { View } from "react-native";
import WorkshopCard from "./WorkshopCard";
import { ScrollView } from "react-native-gesture-handler";
import services from '../constants/temp/Services'

const service = {
    id: 5,
    title: 'Full Car Maintenance Package',
    imageUrl: 'https://example.com/carservice5.jpg',
    favourite: true,
    position: 'San Francisco, USA',
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
    freeService: 'Free oil change'
}

function WorkshopCards() {
    return (
        <ScrollView>
            <WorkshopCard/>
        </ScrollView>
    )
}

export default WorkshopCards