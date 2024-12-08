import {saveUser} from '@/services/auth/secureStore/user';
import navigationPush from '@/services/navigation/push';
import navigationReplace from '@/services/navigation/replace';
import AuthContext from '@/stateManagement/contexts/auth/AuthContext';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {logout} from '@/stateManagement/redux/slices/authSlice';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import AuthAction from '@/types/auth/Action';
import {Entypo} from '@expo/vector-icons';
import {nanoid} from '@reduxjs/toolkit';
import {router} from 'expo-router';
import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface TicDriveAuthButtonProps {
  onPress?: () => void;
  action: AuthAction;
}

const TicDriveAuthButton: React.FC<TicDriveAuthButtonProps> = ({
  onPress,
  action,
}) => {
  const dispatch = useAppDispatch();
  const {setIsUserLogged} = useContext(AuthContext);
  const {navigation} = useContext(NavigationContext);

  const handleLogout = async () => {
    //params for loading car animation - isCarGreen -> animation color is green
    const params = {
      isloggingOut: true,
    };
    navigationReplace(navigation, 'Hub', params);
    dispatch(logout());
    dispatch(reset());
    setIsUserLogged(false);

    await saveUser(null);
  };

  const handleOnPress = () => {
    onPress && onPress();
    if (action === 'logout') {
      navigationPush(navigation, 'UserAuthenticationScreen');
      handleLogout();
    }
  };

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      className={`p-2.5 rounded-2xl ${action === 'login' ? 'bg-green-500' : 'bg-slate-500'}`}
    >
      <View className="flex-row gap-1 items-center justify-center">
        <Entypo name="login" size={24} color="white" />
        <Text className="text-xl text-white">
          {action[0].toUpperCase() + action.slice(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TicDriveAuthButton;
