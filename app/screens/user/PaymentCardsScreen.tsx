import SafeAreaViewLayout from "@/app/layouts/SafeAreaViewLayout"
import TicDriveNavbar from "@/components/navigation/TicDriveNavbar"
import TicDriveButton from "@/components/ui/buttons/TicDriveButton"
import HorizontalLine from "@/components/ui/HorizontalLine"
import PaymentCard from "@/components/ui/payment/PaymentCard"
import { Colors } from "@/constants/Colors"
import GlobalContext from "@/stateManagement/contexts/GlobalContext"
import NavigationContext from "@/stateManagement/contexts/NavigationContext"
import necessaryDeviceBottomInset from "@/utils/devices/necessaryDeviceBottomInset"
import { LinearGradient } from "expo-linear-gradient"
import { useContext } from "react"
import { Pressable, Text, View } from "react-native"

const PaymentCardsScreen = () => {
    const {userPaymentInfo, setUserPaymentInfo} = useContext(GlobalContext) 
    const {navigation} = useContext(NavigationContext);
    return(
        <LinearGradient
        colors={[
          Colors.light.backgroundLinearGradient.start,
          Colors.light.backgroundLinearGradient.end,
        ]}
        className={`flex-1 w-full h-full ${necessaryDeviceBottomInset()}`}
      >
        <SafeAreaViewLayout>
            <View className="flex-1 mx-3.5">
                <TicDriveNavbar 
                    isLoginAvailable={false} 
                    topContent={<Text className='font-semibold text-lg'>Payment methods</Text>}
                    rightContent={<Text className="font-medium text-sm text-cyan-500">+ Add</Text>}
                />
                <Text className="text-sm text-tic my-3">{userPaymentInfo?.customPaymentTypes.length} Cards added</Text>
                {userPaymentInfo?.customPaymentTypes.concat(userPaymentInfo?.defaultPaymentTypes).map(paymentType => (
                <Pressable className="my-2" onPress={() => setUserPaymentInfo({
                    ...userPaymentInfo, choosenCard: paymentType
                })}>
                    <PaymentCard 
                        key={paymentType.id}
                        userName={paymentType.cardHolder ?? ''}
                        paymentType={paymentType.paymentType ?? 'Cash'}
                        icon={paymentType.icon}
                        id={paymentType.id}
                    />
                </Pressable>
                ))}
            </View>
            <HorizontalLine />
            <TicDriveButton text="Confirm" onClick={() => navigation?.goBack()}/>
        </SafeAreaViewLayout>
      </LinearGradient>

    )
}

export default PaymentCardsScreen