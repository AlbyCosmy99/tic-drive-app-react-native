import { ScrollView, Text, View } from "react-native"
import WorkshopRequestCard from "./WorkshopRequestCard"
import WorkshopRequestStatus from "@/types/WorkshopRequestStatus"
import { FC } from "react"

interface WorkshopRequestCardsProps {
    status: WorkshopRequestStatus
}

const WorkshopRequestCards:FC<WorkshopRequestCardsProps> = ({status}) => {
    return (
        <ScrollView className="flex my-4 px-3">
            <WorkshopRequestCard status={status}/>
            <WorkshopRequestCard status={status}/>
            <WorkshopRequestCard status={status}/>
        </ScrollView>

    )
}

export default WorkshopRequestCards