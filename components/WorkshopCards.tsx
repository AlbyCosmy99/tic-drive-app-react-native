import { View } from "react-native";
import WorkshopCard from "./WorkshopCard";
import { ScrollView } from "react-native-gesture-handler";
import workshops from '../constants/temp/Workshops'
import GlobalContext from "@/app/stateManagement/contexts/GlobalContext";
import { useContext, useEffect } from "react";

function WorkshopCards() {
    const {workshopFilter, setWorkshopFilter} = useContext(GlobalContext)

    return (
        <ScrollView>
            {workshops
                .filter(workshop => workshopFilter.length === 0 || workshop.title.toLowerCase().includes(workshopFilter.toLowerCase().trim()))
                .map((workshop, index) => {
                return <WorkshopCard workshop={workshop} key={index}/>
            })}
        </ScrollView>
    )
}

export default WorkshopCards