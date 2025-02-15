import React, {FC, memo, useEffect, useState} from 'react';
import {Colors} from '@/constants/Colors';
import {Card, Text} from '@rneui/themed';
import {
  Image,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
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
import {SvgProps} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

interface ServicesCardProps {
  id: number;
  title?: string;
  description?: string;
  cardStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  icon?: string | FC<SvgProps>;
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
  iconWidth = 30,
  iconHeight = 30,
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
          ? dispatch(setServicesChoosenByUsers({id, title, description, icon}))
          : dispatch(
              setServicesChoosenByWorkshops({
                id,
                title,
                description,
                icon,
              }),
            );
      } else {
        type === 'user'
          ? dispatch(addServiceChoosenByUsers({id, title, description, icon}))
          : dispatch(
              addServiceChoosenByWorkshops({
                id,
                title,
                description,
                icon,
              }),
            );
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
          <View className="flex justify-center items-center relative w-full h-full">
            <View style={styles.cardIcons} className="absolute left-0 top-0">
              {isIconVisible && icon && (
                <View style={iconStyle}>
                  {typeof icon === 'string' ? (
                    <Image
                      source={{uri: icon}}
                      style={{width: iconWidth, height: iconHeight}}
                    />
                  ) : (
                    React.createElement(icon, {
                      width: iconWidth,
                      height: iconHeight,
                    })
                  )}
                </View>
              )}
            </View>
            {isCheckIconAvailable && (
              <View
                style={styles.iconContainer}
                className="absolute top-0 right-0"
              >
                {isPressed && <CheckCircle width={20} height={20} />}
              </View>
            )}
            <Text style={[styles.serviceTitle, titleStyle]}>{title}</Text>
          </View>
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
    height: height > smallDevicebreakpointHeight ? 110 : 100,
  },
  pressedCard: {
    borderColor: Colors.light.green.drive,
  },
  cardIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    textAlign: 'center',
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
