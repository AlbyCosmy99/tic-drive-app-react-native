import React, {FC, memo, useMemo} from 'react';
import {Colors} from '@/constants/Colors';
import {Card, Text} from '@rneui/themed';
import {
  Image,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  Dimensions,
  AccessibilityProps,
} from 'react-native';
import CheckCircle from '@/assets/svg/check_circle.svg';
import CarRepair from '@/assets/svg/servicesIcons/car_repair.svg';
import smallDevicebreakpointHeight from '@/constants/dimensions/smallDevicebreakpointHeight';
import LottieView from 'lottie-react-native';
import {UserCategory} from '@/types/User';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {SvgProps} from 'react-native-svg';
import {
  addService,
  removeService,
  setServices,
} from '@/stateManagement/redux/slices/bookingSlice';
import {useServiceChoosenByCustomer} from '@/hooks/user/useServiceChoosenByCustomer';
import CrossPlatformButtonLayout from './ui/buttons/CrossPlatformButtonLayout';

const {height} = Dimensions.get('window');

interface ServicesCardProps extends AccessibilityProps {
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
  loading?: boolean;
  type?: UserCategory | null;
  onPress?: () => void;
}

const ServicesCard: React.FC<ServicesCardProps> = ({
  id,
  title = '',
  description = '',
  cardStyle = {},
  titleStyle = {},
  icon = CarRepair,
  iconStyle = {},
  iconWidth = 30,
  iconHeight = 30,
  isCheckIconAvailable = true,
  isIconVisible = true,
  loading = false,
  onPress,
}) => {
  const dispatch = useAppDispatch();

  const servicesChoosen = useServiceChoosenByCustomer();
  const serviceTreeLevel = useAppSelector(
    state => state.booking.serviceTreeLevel,
  );

  const isPressed = useMemo(() => {
    return servicesChoosen[serviceTreeLevel - 1]?.id === id;
  }, [servicesChoosen, serviceTreeLevel, id]);

  const handleOnPressIn = () => {
    if (servicesChoosen[serviceTreeLevel - 1]?.id === id) {
      dispatch(setServices(servicesChoosen.slice(0, serviceTreeLevel - 1)));
      dispatch(removeService());
    } else {
      console.log('serviceTreeLevel', serviceTreeLevel)
      const service = {id, title, description, icon};
      dispatch(addService({service, index: serviceTreeLevel - 1}));
    }
  };

  const RenderedIcon = useMemo(() => {
    if (!isIconVisible || !icon) return null;

    return typeof icon === 'string' ? (
      <Image
        source={{uri: icon}}
        style={{width: iconWidth, height: iconHeight}}
        resizeMode="contain"
      />
    ) : (
      React.createElement(icon, {
        width: iconWidth,
        height: iconHeight,
      })
    );
  }, [icon, isIconVisible, iconWidth, iconHeight]);

  return (
    <CrossPlatformButtonLayout
      onPress={onPress ?? handleOnPressIn}
      accessibilityRole="button"
      accessibilityLabel={`Service: ${title}`}
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
            {/* Left Icon */}
            <View style={styles.cardIcons} className="absolute left-0 top-0">
              {RenderedIcon && <View style={iconStyle}>{RenderedIcon}</View>}
            </View>

            {/* Check Icon */}
            {isCheckIconAvailable && (
              <View
                style={styles.iconContainer}
                className="absolute top-0 right-0"
              >
                {isPressed && <CheckCircle width={20} height={20} />}
              </View>
            )}

            {/* Title */}
            <Text
              allowFontScaling={false}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.serviceTitle, titleStyle]}
            >
              {title}
            </Text>
          </View>
        )}
      </Card>
    </CrossPlatformButtonLayout>
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
