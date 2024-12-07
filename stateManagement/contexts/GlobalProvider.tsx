import {FC, ReactNode, useEffect, useState} from 'react';
import GlobalContext from './GlobalContext';
import ApplePayIcon from '../../assets/svg/payment/apple_pay.svg'
import GooglePayIcon from '../../assets/svg/payment/google_pay.svg'
import { Colors } from '@/constants/Colors';
import UserPaymentInfo from '@/types/payment/UserPaymentInfo';
import { View } from 'react-native';

const GlobalProvider: FC<{children: ReactNode}> = ({children}) => {
  const [workshopFilter, setWorkshopFilter] = useState<string>('');
  const [servicesChoosen, setServicesChoosen] = useState<string[]>([]);
  const [carNotFound, setCarNotFound] = useState<boolean>(true);
  const [userPaymentInfo, setUserPaymentInfo] = useState<UserPaymentInfo | null>(null)

  useEffect(() => {
    setUserPaymentInfo({
      choosenCard: null,
      defaultPaymentTypes: [
        {
          cardHolder: 'Andrei Albu',
          paymentType: 'Google Pay',
          cardNumber: null,
          icon: <GooglePayIcon width={40} fill={Colors.light.ticText} />
        },
        {
          cardHolder: 'Andrei Albu',
          paymentType: 'Apple Pay',
          cardNumber: null,
          icon: <ApplePayIcon width={60} />
        },
        {
          cardHolder: 'Andrei Albu',
          paymentType: 'Cash',
          cardNumber: null,
          icon: <ApplePayIcon width={24} fill={Colors.light.ticText} />
        }
      ],
      customPaymentTypes: []
    })
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        workshopFilter,
        setWorkshopFilter,
        servicesChoosen,
        setServicesChoosen,
        carNotFound,
        setCarNotFound,
        userPaymentInfo,
        setUserPaymentInfo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
