import GlobalContext from "@/stateManagement/contexts/GlobalContext";
import { PaymentType } from "@/types/payment/UserPaymentInfo";
import { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native"

interface PaymentCardProps {
    icon: React.ReactNode;
    paymentType: PaymentType;
    userName: string;
    id: number;
}

const PaymentCard:React.FC<PaymentCardProps> = ({icon, paymentType, userName, id}) => {
    const [isDefault, setIsDefault] = useState(false)
    const {userPaymentInfo} = useContext(GlobalContext) 
    useEffect(() => {
        userPaymentInfo?.choosenCard?.id === id ? setIsDefault(true) : setIsDefault(false)
    }, [userPaymentInfo?.choosenCard?.id])
    return (
        <View className="flex flex-row items-center border border-grey-light p-3 rounded-lg">
            <View className={`border w-16 h-9 py-1 rounded-lg border-grey-light flex justify-center items-center`}>
                {icon}
            </View>
            <View className="mx-3">
                <Text className="text-base font-medium">{paymentType}</Text>
                <Text className="text-tic text-sm">{userName}</Text>
            </View>
            {isDefault && <Text className="absolute bg-green-light text-tic p-2 py-1 rounded-md top-3 right-3">Default</Text>}
        </View>
    )
}

export default PaymentCard