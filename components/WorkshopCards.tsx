import { View } from "react-native";
import WorkshopCard from "./WorkshopCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import workshops, { Workshop } from '../constants/temp/Workshops'
import GlobalContext from "@/app/stateManagement/contexts/GlobalContext";
import { useContext, useEffect } from "react";
import { router } from "expo-router";

function WorkshopCards() {
    const {workshopFilter, servicesChoosen} = useContext(GlobalContext)

    const handleCardPress = (workshop: Workshop) => {
        router.push('../screens/WorkshopDetails')
    }

    const anyService = (services: string[]) => {
        console.log(services)
        for(let serviceChoosen of servicesChoosen) {
            console.log(services.includes(serviceChoosen.toLowerCase()))
            if(services.includes(serviceChoosen.toLowerCase())) return true
        }
        return false
    } 

    return (
        <ScrollView>
            {workshops
                .filter(workshop => 
                    (workshopFilter.length === 0 
                    || workshop.title.toLowerCase().includes(workshopFilter.toLowerCase().trim()))
                    && (anyService(workshop.services))

                )
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