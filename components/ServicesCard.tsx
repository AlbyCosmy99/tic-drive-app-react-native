import React, {memo, useEffect, useState} from 'react';
import {Colors} from '@/constants/Colors';
import {Card, Text} from '@rneui/themed';
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import CheckCircle from '../assets/svg/check_circle.svg';
import CarRepair from '../assets/svg/servicesIcons/car_repair.svg'; //default icon
import smallDevicebreakpointHeight from '@/constants/smallDevicebreakpointHeight';
import {Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {UserCategory} from '@/types/User';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {
  addServiceChoosenByUsers,
  addServiceChoosenByWorkshops,
  removeServiceChoosenByUsers,
  removeServiceChoosenByWorkshops,
  setServicesChoosenByUsers,
  setServicesChoosenByWorkshops,
} from '@/stateManagement/redux/slices/servicesSlice';

const {width, height} = Dimensions.get('window');

interface ServicesCardProps {
  id: number;
  title?: string;
  description?: string;
  cardStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  icon?: React.FC<{width: number; height: number}>; //is <Feather name="search" size={24} color="black" />
  isIconVisible?: boolean;
  iconStyle?: StyleProp<ViewStyle>;
  iconWidth?: number;
  iconHeight?: number;
  isCheckIconAvailable?: boolean;
  pressIn?: (id: number) => void;
  disabledPressIn?: boolean;
  loading?: boolean;
  type?: UserCategory | null;
  isSingleChoice?: boolean | null;
}

const ServicesCard: React.FC<ServicesCardProps> = ({
  id,
  title = '',
  description = '',
  cardStyle = {},
  titleStyle = {},
  descriptionStyle = {},
  icon = CarRepair,
  iconStyle = {},
  iconWidth = 20,
  iconHeight = 20,
  isCheckIconAvailable = true,
  isIconVisible = true,
  pressIn,
  disabledPressIn = false,
  loading = false,
  type = null,
  isSingleChoice = null,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useAppDispatch();

  const handleOnPressIn = () => {
    if (disabledPressIn) return;

    if (pressIn) {
      pressIn(id);
    }

    //if isSingleChoice === null, the card it is not linked to user or workshop services choices
    if (isSingleChoice === null) return;

    if (isPressed) {
      type === 'user'
        ? dispatch(removeServiceChoosenByUsers(id))
        : dispatch(removeServiceChoosenByWorkshops(id));
    } else {
      if (isSingleChoice) {
        type === 'user'
          ? dispatch(setServicesChoosenByUsers({id, name: title}))
          : dispatch(setServicesChoosenByWorkshops({id, name: title}));
      } else {
        type === 'user'
          ? dispatch(addServiceChoosenByUsers({id, name: title}))
          : dispatch(addServiceChoosenByWorkshops({id, name: title}));
      }
    }
    setIsPressed(!isPressed);
  };

  const servicesChoosenByUsers = useAppSelector(
    state => state.services.servicesChoosenByUsers,
  );
  const servicesChoosenByWorkshops = useAppSelector(
    state => state.services.servicesChoosenByWorkshops,
  );

  useEffect(() => {
    if (
      type === 'user' &&
      !servicesChoosenByUsers.find(service => service.id === id)
    ) {
      setIsPressed(false);
    }
  }, [servicesChoosenByUsers]);

  useEffect(() => {
    if (
      type === 'workshop' &&
      !servicesChoosenByWorkshops.find(service => service.id === id)
    ) {
      setIsPressed(false);
    }
  }, [servicesChoosenByWorkshops]);

  const ServiceIcon = icon;

  return (
    <TouchableWithoutFeedback
      onPressIn={handleOnPressIn}
      accessible={true}
      accessibilityLabel={title}
      accessibilityRole="button"
    >
      <Card
        containerStyle={[
          styles.card,
          cardStyle,
          isPressed && styles.pressedCard,
        ]}
      >
        {loading ? (
          <View className="justify-center items-center w-full h-full">
            <LottieView
              source={require('@/assets/json/animations/TicDriveLoadingGrey.json')}
              autoPlay
              loop
              style={styles.lottieAnimation}
            />
          </View>
        ) : (
          <>
            <View style={styles.cardIcons}>
              {isIconVisible && (
                <View style={iconStyle}>
                  <ServiceIcon width={iconWidth} height={iconHeight} />
                </View>
              )}
              {isCheckIconAvailable && (
                <View style={styles.iconContainer}>
                  {isPressed && <CheckCircle width={20} height={20} />}
                </View>
              )}
            </View>
            <Text style={[styles.serviceTitle, titleStyle]}>{title}</Text>
            <Text
              style={[styles.serviceDesc, descriptionStyle]}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          </>
        )}
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    marginHorizontal: 7,
    borderRadius: 15,
    padding: 15,
    elevation: 1,
    borderWidth: 1,
    height: height > smallDevicebreakpointHeight ? 160 : 150,
  },
  pressedCard: {
    borderColor: Colors.light.green.drive,
  },
  cardIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceTitle: {
    fontWeight: '500',
    fontSize: height > smallDevicebreakpointHeight ? 16 : 14,
    marginBottom: 10,
  },
  serviceDesc: {
    opacity: 0.6,
    marginBottom: 25,
    fontSize: 12,
  },
  lottieAnimation: {
    width: '100%',
    alignSelf: 'flex-end',
    height: 200,
  },
});

export default memo(ServicesCard);
