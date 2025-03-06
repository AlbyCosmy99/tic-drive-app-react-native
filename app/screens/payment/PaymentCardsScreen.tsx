import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import HorizontalLine from '@/components/ui/HorizontalLine';
import PaymentCard from '@/components/ui/payment/PaymentCard';
import {Colors} from '@/constants/Colors';
import navigationPush from '@/services/navigation/push';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import necessaryDeviceBottomInset from '@/utils/devices/necessaryDeviceBottomInset';
import {LinearGradient} from 'expo-linear-gradient';
import {useContext, useEffect} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

const PaymentCardsScreen = () => {
  const {userPaymentInfo, setUserPaymentInfo} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);

  useEffect(() => {
    if (
      !userPaymentInfo?.customPaymentTypes.find(
        type => type.id === userPaymentInfo?.choosenCard?.id,
      ) &&
      !userPaymentInfo?.customPaymentTypes.find(
        type => type.id === userPaymentInfo?.choosenCard?.id,
      ) &&
      ![-1, -2, -3].includes(userPaymentInfo?.choosenCard?.id!)
    ) {
      setUserPaymentInfo({
        ...userPaymentInfo,
        customPaymentTypes: userPaymentInfo!.customPaymentTypes,
        choosenCard: userPaymentInfo?.defaultPaymentTypes[1] ?? null,
        defaultPaymentTypes: userPaymentInfo?.defaultPaymentTypes || [],
      });
    }
  }, [userPaymentInfo]);

  return (
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
            topContent={
              <Text className="font-semibold text-lg">Payment methods</Text>
            }
            rightContent={
              <Pressable
                onPress={() =>
                  navigationPush(navigation, 'AddNewPaymentMethodScreen')
                }
              >
                <Text className="font-medium text-sm text-cyan-500">+ Add</Text>
              </Pressable>
            }
          />
          <Text className="text-sm text-tic my-3">
            {userPaymentInfo?.customPaymentTypes.length} Cards added
          </Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {userPaymentInfo?.customPaymentTypes
              .concat(userPaymentInfo?.defaultPaymentTypes)
              .map(paymentType => (
                <Pressable
                  key={paymentType.id}
                  className="my-2"
                  onPress={() =>
                    setUserPaymentInfo({
                      ...userPaymentInfo,
                      choosenCard: paymentType,
                    })
                  }
                >
                  <PaymentCard
                    userName={paymentType.cardHolder ?? ''}
                    paymentType={paymentType.paymentType ?? 'Cash'}
                    icon={paymentType.icon}
                    id={paymentType.id}
                  />
                </Pressable>
              ))}
          </ScrollView>
        </View>
        <HorizontalLine />
        <TicDriveButton text="Choose" onClick={() => navigation?.goBack()} />
      </SafeAreaViewLayout>
    </LinearGradient>
  );
};

export default PaymentCardsScreen;
