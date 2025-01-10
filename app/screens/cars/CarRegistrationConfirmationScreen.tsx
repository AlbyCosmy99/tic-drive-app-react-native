import SafeAreaViewLayout from "@/app/layouts/SafeAreaViewLayout"
import ToPreviousPage from "@/components/navigation/ToPreviousPage"
import TicDriveButton from "@/components/ui/buttons/TicDriveButton"
import RegistrationCarDetailCard from "@/components/ui/cards/cars/RegistrationCarDetailCard"
import HorizontalLine from "@/components/ui/HorizontalLine"
import BoldTitle1 from "@/components/ui/text/BoldTitle1"
import { Colors } from "@/constants/Colors"
import Car from "@/types/Car"
import { RouteProp, useRoute } from "@react-navigation/native"
import { useNavigation } from "expo-router"
import { Pressable, View } from "react-native"
import { Text } from "react-native"

interface RouteParams {
    carSelected: Car
}

type CarRouteProp = RouteProp<{params: RouteParams}, 'params'>

const CarRegistrationConfirmationScreen = () => {
    const route = useRoute<CarRouteProp>()
    const {carSelected} = route.params
    const navigation = useNavigation()

    return (
        <SafeAreaViewLayout>
            <View className="flex-1">
                <ToPreviousPage containerClassName="m-2 mb-7" />
                <View className="mt-24">
                    <BoldTitle1 title="Confirm your vehicle"/>
                    <View className="mx-3 p-4 border-2 border-grey-light rounded-xl mt-6">
                        <Text className="text-center py-2 pb-4">logo marca auto</Text>
                        <View className="mb-2">
                            <RegistrationCarDetailCard title="Make" value={carSelected.make}/>
                            <RegistrationCarDetailCard title="Model" value={carSelected.model}/>
                            <RegistrationCarDetailCard title="Year" value={carSelected.year.toString()}/>
                            <RegistrationCarDetailCard title="Engine displacement" value={carSelected.engineDisplacement!}/>
                            <RegistrationCarDetailCard title="Fuel" value={carSelected.fuel}/>
                            <RegistrationCarDetailCard title="Mileage" value={carSelected.mileage.toString()}/>
                        </View>
                        <HorizontalLine />
                        <Pressable onPress={() =>navigation.goBack()}><Text className="text-green-inter text-base font-medium mt-2">Change</Text></Pressable>
                    </View>
                </View>
            </View>
            <TicDriveButton
                text="Confirm"
                routeName="userTabs"
                stateRouteName="Home"
            />
        </SafeAreaViewLayout>
    )
}

export default CarRegistrationConfirmationScreen