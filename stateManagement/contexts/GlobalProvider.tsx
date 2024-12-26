import {FC, ReactNode, useEffect, useState} from 'react';
import GlobalContext from './GlobalContext';
import ApplePayIcon from '../../assets/svg/payment/apple_pay.svg';
import GooglePayIcon from '../../assets/svg/payment/google_pay.svg';
import CashIcon from '../../assets/svg/payment/cash.svg';
import {Colors} from '@/constants/Colors';
import UserPaymentInfo, {
  PaymentCard,
} from '@/types/payment/UserPaymentInfo';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import { useAppSelector } from '../redux/hooks';

const GlobalProvider: FC<{children: ReactNode}> = ({children}) => {
  const [workshopFilter, setWorkshopFilter] = useState<string>('');
  const [servicesChoosen, setServicesChoosen] = useState<string[]>([]);
  const [carNotFound, setCarNotFound] = useState<boolean>(true);
  const [userPaymentInfo, setUserPaymentInfo] =
    useState<UserPaymentInfo | null>(null);
  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    const defaultPaymentTypes: PaymentCard[] = [
      {
        id: -3,
        cardHolder: user ? user.name : '',
        paymentType: 'Cash',
        cardNumber: null,
        icon: <CashIcon width={24} fill={Colors.light.ticText} />,
      },
    ];

    isAndroidPlatform()
      ? defaultPaymentTypes.push({
          id: -1,
          cardHolder: user ? user.name : '',
          paymentType: 'Google Pay',
          cardNumber: null,
          icon: <GooglePayIcon width={40} fill={Colors.light.ticText} />,
        })
      : defaultPaymentTypes.push({
          id: -2,
          cardHolder: user ? user.name : '',
          paymentType: 'Apple Pay',
          cardNumber: null,
          icon: <ApplePayIcon width={60} />,
        });

    setUserPaymentInfo({
      choosenCard: null,
      defaultPaymentTypes,
      customPaymentTypes: [],
    });
  }, []);

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
        setUserPaymentInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
