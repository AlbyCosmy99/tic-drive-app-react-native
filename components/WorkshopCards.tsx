import { View } from "react-native";
import WorkshopCard from "./WorkshopCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import workshops, { Workshop } from '../constants/temp/Workshops'
import GlobalContext from "@/app/stateManagement/contexts/GlobalContext";
import { useContext, useEffect } from "react";

function WorkshopCards() {
    const {workshopFilter, setWorkshopFilter} = useContext(GlobalContext)

    const handleCardPress = (workshop: Workshop) => {
        alert('pressed ' + workshop.title)
    }

    return (
        <ScrollView>
            {workshops
                .filter(workshop => workshopFilter.length === 0 || workshop.title.toLowerCase().includes(workshopFilter.toLowerCase().trim()))
                .map((workshop, index) => {
                return (
                    <TouchableOpacity key={index} onPress={() => handleCardPress(workshop)}>
                        <WorkshopCard workshop={workshop}/>
                    </TouchableOpacity>
                )
            })}
        </ScrollView>
    )
}

export default WorkshopCards