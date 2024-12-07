import { PaymentType } from "@/types/payment/UserPaymentInfo";
import { Text, View } from "react-native"

interface PaymentCardProps {
    icon: React.ReactNode;
    paymentType: PaymentType;
    userName: string;
}

const PaymentCard:React.FC<PaymentCardProps> = ({icon, paymentType, userName}) => {
    return (
        <View className="flex flex-row items-center border border-grey-light p-3 rounded-lg">
            <View className={`border py-1 rounded-lg border-grey-light ${paymentType === 'Google Pay' && 'px-2'}`}>
                {icon}
            </View>
            <View className="mx-3">
                <Text className="text-base font-medium">{paymentType}</Text>
                <Text className="text-tic text-sm">{userName}</Text>
            </View>
            <Text className="absolute bg-green-light text-tic p-2 py-1 rounded-md top-3 right-3">Default</Text>
        </View>
    )
}

export default PaymentCard