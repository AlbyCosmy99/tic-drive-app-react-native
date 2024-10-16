import React, {memo, useContext} from 'react';
import {Button} from '@rneui/themed';
import {StyleProp, ViewStyle} from 'react-native';
import {Colors} from '@/constants/Colors';
import {useRouter, Href} from 'expo-router';
import GlobalContext from '@/app/stateManagement/contexts/GlobalContext';
import {StackActions, useNavigation} from '@react-navigation/native';

interface TicDriveButtonProps {
  text: string;
  customButtonStyle?: StyleProp<ViewStyle>;
  customContainerStyle?: StyleProp<ViewStyle>;
  path?: Href;
  replace?: boolean;
  onClick?: () => void;
  toTop?: boolean;
  disabled?: boolean;
}

const TicDriveButton: React.FC<TicDriveButtonProps> = ({
  text,
  customButtonStyle,
  customContainerStyle,
  path,
  replace = false,
  onClick,
  toTop = false,
  disabled = false,
}) => {
  const router = useRouter();
  const {servicesChoosen, carNotFound, setWorkshopFilter} =
    useContext(GlobalContext);
  const navigation = useNavigation();

  // const whenIsDisabled: Record<string, boolean> = {
  //   "book a service": servicesChoosen.length === 0,
  //   "confirm": carNotFound,
  //   "continue": servicesChoosen.length === 0,
  // };

  return (
    <Button
      title={text}
      disabled={disabled}
      buttonStyle={[
        {
          borderRadius: 40,
          height: 60,
          backgroundColor: Colors.light.green.drive,
        },
        customButtonStyle,
      ]}
      containerStyle={[
        {
          margin: 15,
          marginBottom: 0,
        },
        customContainerStyle,
      ]}
      onPress={() => {
        if (path) {
          if (toTop && navigation.canGoBack()) {
            navigation.dispatch(StackActions.popToTop());
          }
          if (!replace) {
            router.push(path ?? '/');
          } else {
            router.replace(path ?? '/');
          }

          if (text.toLowerCase() === 'confirm') {
            setWorkshopFilter('');
          }
        }
        if (onClick) {
          onClick();
        }
      }}
    />
  );
};

export default memo(TicDriveButton);
