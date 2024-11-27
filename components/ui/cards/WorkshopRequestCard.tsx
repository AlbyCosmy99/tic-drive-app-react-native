import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { FC } from "react"
import WorkshopRequestStatus from "@/types/WorkshopRequestStatus"
import CircularUserAvatar from "../avatars/CircularUserAvatar"
import PendingIcon from '../../../assets/svg/requestStatus/pending.svg'
import AcceptedIcon from '../../../assets/svg/requestStatus/check.svg'
import { Colors } from "@/constants/Colors"
import CalendarIcon from '../../../assets/svg/event_available.svg'
import CarRepairIcon from '../../../assets/svg/servicesIcons/car_repair.svg'
import CreditCardIcon from '../../../assets/svg/payment/credit_score.svg'
import CarIcon from '../../../assets/svg/vehicles/car1.svg'
import HorizontalLine from "../HorizontalLine"
interface WorkshopRequestCardProps {
    status: WorkshopRequestStatus
}

const WorkshopRequestCard:FC<WorkshopRequestCardProps> = ({status}) => {
    return (
        <View className="border border-slate-200 rounded-xl mt-4">
            <View className="p-4 pb-0">
                <View className="flex flex-row justify-between items-center border-b p-1 pb-4 mt-1" style={styles.userInfoContainer}>
                    <View className="flex gap-2 flex-row justify-between items-center">
                        <CircularUserAvatar uri="https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltc86e7943bcc0e006/6569cbef0b642304079a348b/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0"/>
                        <Text className="font-semibold">John Doe</Text>
                    </View>
                    <View className="flex flex-row justify-between items-center p-2 px-3 rounded-lg" style={status === 'pending' ? styles.pendingContainer : styles.acceptedContainer}> 
                        {status === 'pending' ? <PendingIcon width={20} height={20}/> : <AcceptedIcon width={20} height={20}/>}
                        <Text className="font-medium" style={status === 'pending' ? styles.pending : styles.accepted}>{status}</Text>
                    </View>
                </View>

                {/* time */}
                <View className="flex flex-row justify-between items-center my-2 mt-4">
                    <View className="flex gap-2 flex-row justify-between items-center">
                        <CalendarIcon />
                        <Text>Time</Text>
                    </View>
                    <View className="flex flex-row justify-between items-center pr-1">
                        <Text className="font-medium">today - 13:00</Text>
                    </View>
                </View>

                {/* service */}
                <View className="flex flex-row justify-between items-center my-2">
                    <View className="flex gap-2 flex-row justify-between items-center">
                        <CarRepairIcon />
                        <Text>Service</Text>
                    </View>
                    <View className="flex flex-row justify-between items-center pr-1">
                        <Text className="font-medium">Oil change</Text>
                    </View>
                </View>

                {/* vehicle */}
                <View className="flex flex-row justify-between items-center my-2">
                    <View className="flex gap-2 flex-row justify-between items-center">
                        <CarIcon />
                        <Text>Vehicle</Text>
                    </View>
                    <View className="flex flex-row justify-between items-center pr-1">
                        <Text className="font-medium">Toyota Corolla 2021</Text>
                    </View>
                </View>

                {/* payment status */}
                <View className="flex flex-row justify-between items-center my-2">
                    <View className="flex gap-2 flex-row justify-between items-center">
                        <CreditCardIcon />
                        <Text>Payment status</Text>
                    </View>
                    <View className="flex flex-row justify-between items-center pr-1">
                        <Text className="font-medium">$53 paid</Text>
                    </View>
                </View>
                {
                    status === 'pending' && (
                        <View className="flex flex-row items-center my-2 mt-4">
                            <View className="flex-1 flex items-center justify-center mx-2 p-2 rounded-3xl border bg-drive border-drive">
                                <TouchableWithoutFeedback>
                                    <Text style={styles.acceptText}>Accept</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View className="flex-1 flex items-center justify-center mx-2 p-2 rounded-3xl border border-tic">
                                <TouchableWithoutFeedback>
                                    <Text className="text-tic">Reject</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    )
                }
            </View>
            {status === 'accepted' && (
                <View className="flex flex-row justify-center items-center bg-slate-100 p-3 my-2">
                    <Text className="text-center text-2xl mr-2 text-tic" >PIN:</Text>
                    <Text className="text-2xl" style={styles.pinValue}>55794</Text>
                </View>
            )}
            <Text className="text-center mt-2 mb-3 text-tic">Suggest new time?</Text>
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
    },
    acceptText: {
        color: 'white'
    },
    pinLabel: {
        fontFamily: 'RegularLato'
    },
    pinValue: {
        fontFamily: 'RegularLato'
    }
})

export default WorkshopRequestCard