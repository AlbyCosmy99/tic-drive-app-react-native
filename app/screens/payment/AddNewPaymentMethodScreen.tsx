import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import HorizontalLine from '@/components/ui/HorizontalLine';
import TicDriveInputLabel from '@/components/ui/inputs/TicDriveInputLabel';
import {Colors} from '@/constants/Colors';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import {useContext, useState} from 'react';
import {Text, View} from 'react-native';
import VisaIcon from '../../../assets/svg/payment/visa.svg';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';

const AddNewPaymentMethodScreen = () => {
  const {navigation} = useContext(NavigationContext);
  const {userPaymentInfo, setUserPaymentInfo} = useContext(GlobalContext);
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const onConfirm = () => {
    if (!cardHolder) {
      return; //to-do: inserire validazione per form
    }
    setUserPaymentInfo({
      ...userPaymentInfo,
      customPaymentTypes: [
        ...(userPaymentInfo?.customPaymentTypes || []),
        {
          id: userPaymentInfo?.customPaymentTypes?.length || 0,
          paymentType: 'Visa',
          cardHolder,
          cardNumber,
          icon: <VisaIcon width={32} fill={Colors.light.ticText} />,
        },
      ],
      choosenCard: userPaymentInfo?.choosenCard ?? null,
      defaultPaymentTypes: userPaymentInfo?.defaultPaymentTypes || [],
    });
    navigation?.goBack();
  };

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar
          isLoginAvailable={false}
          topContent={
            <Text className="font-semibold text-lg">Enter payment details</Text>
          }
        />
        <View className="my-4 flex-1">
          <TicDriveInputLabel
            value={cardHolder}
            onChange={e => setCardHolder(e)}
            label="Cardholder name *"
            placeholder="e.g. John A. Doe"
          />
          <TicDriveInputLabel
            value={cardNumber}
            onChange={e => setCardNumber(e)}
            label="Card number"
            placeholder="Card number"
          />
          <TicDriveInputLabel label="Expiration Date" placeholder="MM/YY" />
          <View className="relative">
            <TicDriveInputLabel
              label="Security Code (CVV)"
              placeholder="e.g. 123"
            />
            <Text className="absolute bottom-0 mx-2.5 text-tic text-sm">
              The 3-digit number on the back of your card.
            </Text>
          </View>
        </View>
        <HorizontalLine />
        <TicDriveButton
          disabled={!cardHolder}
          text="Add card"
          onClick={onConfirm}
        />
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
};

export default AddNewPaymentMethodScreen;
