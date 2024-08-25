import { View } from "react-native";
import WorkshopCard from "./WorkshopCard";
import { ScrollView } from "react-native-gesture-handler";
import workshop from '../constants/temp/Workshops'

function WorkshopCards() {
    return (
        <ScrollView>
            {workshop.map((workshop, index) => {
                return <WorkshopCard workshop={workshop} key={index}/>
            })}
        </ScrollView>
    )
}

export default WorkshopCards