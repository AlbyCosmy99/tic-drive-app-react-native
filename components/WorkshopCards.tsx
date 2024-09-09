import WorkshopCard from "./WorkshopCard";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import workshops, { Workshop } from '../constants/temp/Workshops'
import GlobalContext from "@/app/stateManagement/contexts/GlobalContext";
import { memo, useContext, useEffect } from "react";
import { router } from "expo-router";

function WorkshopCards() {
    const {workshopFilter, servicesChoosen, isUserLogged} = useContext(GlobalContext)

    const handleCardPress = (workshop: Workshop) => {
        router.push({
            pathname: '../screens/WorkshopDetails',
            params: { id: workshop.id }
        })
    }

    //checking if servicesChoosen are in the services offered by a workshop
    const anyService = (services: string[]) => {
        for(let serviceChoosen of servicesChoosen) {
            if(services.includes(serviceChoosen.toLowerCase())) return true
        }
        return false
    } 

    return (
        <ScrollView className={!isUserLogged ? "mb-2" : ''}>
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

export default memo(WorkshopCards)