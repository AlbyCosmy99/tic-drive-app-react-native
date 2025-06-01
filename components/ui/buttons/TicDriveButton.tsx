import React, {memo, useContext} from 'react';
import {Button} from '@rneui/themed';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Colors} from '@/constants/Colors';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import navigationPush from '@/services/navigation/push';
import navigationReplace from '@/services/navigation/replace';
import navigationReset from '@/services/navigation/reset';
import {Text} from 'react-native';

interface TicDriveButtonProps {
  text: string;
  customButtonStyle?: StyleProp<ViewStyle>;
  customContainerStyle?: StyleProp<ViewStyle>;
  customDisabledStyle?: StyleProp<ViewStyle>;
  customTitleStyle?: StyleProp<TextStyle>;
  routeName?: string;
  routeParams?: any;
  stateRouteName?: string;
  stateRouteParams?: any;
  replace?: boolean;
  onClick?: () => void;
  toTop?: boolean;
  disabled?: boolean;
}

const TicDriveButton: React.FC<TicDriveButtonProps> = ({
  text,
  customButtonStyle,
  customContainerStyle,
  customDisabledStyle,
  customTitleStyle,
  routeName,
  routeParams = {},
  stateRouteName,
  stateRouteParams = {},
  replace = false,
  onClick,
  toTop = false,
  disabled = false,
}) => {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);

  return (
    <Button
      title={
        <Text
          className="text-white text-lg"
          allowFontScaling={false}
          style={customTitleStyle}
        >
          {text}
        </Text>
      }
      disabled={disabled}
      disabledStyle={customDisabledStyle}
      disabledTitleStyle={{color: 'white'}}
      buttonStyle={[
        {
          borderRadius: 40,
          height: 48,
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
        if (routeName) {
          if (toTop) {
            navigationReset(
              navigation,
              0,
              routeName ?? 'Hub',
              routeParams,
              stateRouteName,
              stateRouteParams,
            );
          } else if (replace) {
            navigationReplace(navigation, routeName ?? 'Hub', routeParams);
          } else {
            navigationPush(
              navigation,
              routeName ?? 'Hub',
              routeParams,
              stateRouteName,
              stateRouteParams,
            );
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
