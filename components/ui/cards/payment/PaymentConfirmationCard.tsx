import { Colors } from "@/constants/Colors"
import { useServicesChoosenByUsers } from "@/hooks/user/useServiceChoosenByUsers"
import Workshop from "@/types/workshops/Workshop"
import { Image } from "@rneui/themed"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import HorizontalLine from "../../HorizontalLine"
import IconTextPair from "../../IconTextPair"
import CalendarIcon from '../../../../assets/svg/free_cancellation.svg'
import calculateWorkshopDiscount from "@/utils/workshops/calculateWorkshopDiscount"
import TicDriveOptionButton from "../../buttons/TicDriveOptionButton"
const PaymentConfirmationCard = ({workshop,timeDate}: {workshop: Workshop, timeDate: string}) => {
    const servicesChoosen = useServicesChoosenByUsers();

    return (
        <View>
            <View className="flex flex-row my-4">
              {/* to do- spostare le immagini in un componente */}
              <Image
                source={{uri: workshop?.imageUrl}}
                containerStyle={styles.image}
                PlaceholderContent={
                  <ActivityIndicator
                    size="large"
                    color={Colors.light.bookingsOptionsText}
                  />
                }
              />
              <View>
                <Text className="text-xs font-medium" style={styles.pendingText}>Pending confirmation</Text>
                <Text className="font-medium text-xl">{workshop.title}</Text>
                <View className="bg-green-light p-1.5 rounded self-start">
                    <Text className="text-green-dark font-semibold">{servicesChoosen.length ? servicesChoosen[0].name : ''}</Text>
                </View>
              </View>
            </View>
            <HorizontalLine color="red"/>
            <View>
                <IconTextPair 
                    icon={<CalendarIcon />}
                    text={timeDate}
                />
                 <IconTextPair 
                    icon={<CalendarIcon />}
                    text={`$${calculateWorkshopDiscount(workshop.price, workshop.discount)} total paid`}
                />
                 <IconTextPair 
                    icon={<CalendarIcon />}
                    text={workshop.position}
                />
            </View>
            <TicDriveOptionButton 
                icon={<CalendarIcon />} 
                text="Directions"
                textTailwindCss="font-medium text-base"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 12,
    },
    pendingText: {
        color: '#D28B30'
    }
})

export default PaymentConfirmationCard