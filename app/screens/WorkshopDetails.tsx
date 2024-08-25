import workshops, { Workshop } from "@/constants/temp/Workshops";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";

export default function WorkshopDetails() {
    const {id} = useLocalSearchParams()

    const [workshop, setWorkshop] = useState<Workshop | null>(null);

    useEffect(() => {
        setWorkshop(workshops.find(workshop => String(workshop.id)=== id) || null)
    }, [id])

    if(!workshop) {
        return <Text>Workshop not found.</Text>
    }
    
    return (<Text>{workshop.title}</Text>)
}