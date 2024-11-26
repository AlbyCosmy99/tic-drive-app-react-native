import { Text, View } from "react-native"
import WorkshopRequestCard from "./WorkshopRequestCard"
import WorkshopRequestStatus from "@/types/WorkshopRequestStatus"
import { FC } from "react"

interface WorkshopRequestCardsProps {
    status: WorkshopRequestStatus
}

const WorkshopRequestCards:FC<WorkshopRequestCardsProps> = ({status}) => {
    return (
        <View className="flex mt-4">
            <WorkshopRequestCard status={status}/>
            <WorkshopRequestCard status={status}/>
        </View>

    )
}

export default WorkshopRequestCards