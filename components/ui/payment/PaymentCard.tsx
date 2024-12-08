import GlobalContext from '@/stateManagement/contexts/GlobalContext';
import {PaymentType} from '@/types/payment/UserPaymentInfo';
import {useContext, useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

interface PaymentCardProps {
  icon: React.ReactNode;
  paymentType: PaymentType;
  userName: string;
  id: number;
  optionsVisible?: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  icon,
  paymentType,
  userName,
  id,
  optionsVisible = true,
}) => {
  const [isDefault, setIsDefault] = useState(false);
  const {userPaymentInfo, setUserPaymentInfo} = useContext(GlobalContext);
  const [isCustomCard, setIsCustomCard] = useState(false);
  useEffect(() => {
    userPaymentInfo?.choosenCard?.id === id
      ? setIsDefault(true)
      : setIsDefault(false);
    setIsCustomCard(
      !!userPaymentInfo?.customPaymentTypes.find(type => type.id === id),
    );
  }, [userPaymentInfo?.choosenCard?.id]);

  const onDeleteCard = (id: number) => {
    setUserPaymentInfo({
      ...userPaymentInfo,
      customPaymentTypes: userPaymentInfo!.customPaymentTypes.filter(
        card => card.id !== id,
      ),
      choosenCard: userPaymentInfo?.choosenCard ?? null,
      defaultPaymentTypes: userPaymentInfo?.defaultPaymentTypes || [],
    });
  };

  return (
    <View className="flex flex-row items-center border border-grey-light p-3 rounded-lg">
      <View
        className={`border w-16 h-9 py-1 rounded-lg border-grey-light flex justify-center items-center ${optionsVisible && isCustomCard && 'mb-6'}`}
      >
        {icon}
      </View>
      <View className="mx-3">
        <View className="mb-2">
          <Text className="text-base font-medium">{paymentType}</Text>
          <Text className="text-tic text-sm">{userName}</Text>
        </View>
        {optionsVisible && isCustomCard && (
          <View className="flex flex-row gap-8">
            <Pressable onPress={() => onDeleteCard(id)}>
              <Text className="font-semibold text-sm text-tic">Delete</Text>
            </Pressable>
            <Text className="font-semibold text-sm text-drive">Edit</Text>
          </View>
        )}
      </View>
      {isDefault && (
        <Text className="absolute bg-green-light text-tic p-2 py-1 rounded-md top-3 right-3">
          Default
        </Text>
      )}
    </View>
  );
};

export default PaymentCard;
