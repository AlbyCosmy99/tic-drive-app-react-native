import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import HorizontalLine from "../HorizontalLine"
import { FC } from "react"
import WorkshopRequestStatus from "@/types/WorkshopRequestStatus"
import CircularUserAvatar from "../avatars/CircularUserAvatar"
import PendingIcon from '../../../assets/svg/requestStatus/pending.svg'
import AcceptedIcon from '../../../assets/svg/requestStatus/check.svg'
import { Colors } from "@/constants/Colors"

interface WorkshopRequestCardProps {
    status: WorkshopRequestStatus
}

const WorkshopRequestCard:FC<WorkshopRequestCardProps> = ({status}) => {
    return (
        <View className="border border-slate-200 rounded-xl p-4 mt-4">
            <View className="flex flex-row justify-between items-center border-b p-1 pb-4" style={styles.userInfoContainer}>
                <View className="flex gap-2 flex-row justify-between items-center">
                    <CircularUserAvatar />
                    <Text className="font-semibold">John Doe</Text>
                </View>
                <View className="flex flex-row justify-between items-center p-2 px-3 rounded-lg" style={status === 'pending' ? styles.pendingContainer : styles.acceptedContainer}> 
                    {status === 'pending' ? <PendingIcon width={20} height={20}/> : <AcceptedIcon width={20} height={20}/>}
                    <Text className="font-medium" style={status === 'pending' ? styles.pending : styles.accepted}>{status}</Text>
                </View>
            </View>
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row justify-between items-center">
                    <Text>icon</Text>
                    <Text>time</Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                    <Text>icon</Text>
                    <Text>today - 13:00</Text>
                </View>
            </View>
            {status === 'accepted' && (
                <View>
                    <Text className="text-center">pin: 55794</Text>
                </View>
            )}
            <View className="flex flex-row items-center">
                <View className="flex-1 flex items-center justify-center">
                    <TouchableWithoutFeedback>
                        <Text>Accept</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View className="flex-1 flex items-center justify-center">
                    <TouchableWithoutFeedback>
                        <Text>Reject</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <Text className="text-center">Suggest new time?</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    pending: {
        color: '#D28B30'
    },
    accepted: {
        color: '#0F7439'
    },
    pendingContainer: {
        backgroundColor: '#FCF1E3'
    },
    acceptedContainer: {
        backgroundColor: '#D9E9DF'
    },
    userInfoContainer: {
        borderBottomColor: Colors.light.SegmentedControlBackground
    }
})

export default WorkshopRequestCard