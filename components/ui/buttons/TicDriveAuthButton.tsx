import { removeSecureToken } from '@/services/auth/secureStore/setToken';
import navigationReplace from '@/services/navigation/replace';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {logout} from '@/stateManagement/redux/slices/authSlice';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import AuthAction from '@/types/auth/Action';
import {Entypo} from '@expo/vector-icons';
import React, {useContext, useState} from 'react';
import { Text, View} from 'react-native';
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
  const {navigation} = useContext(NavigationContext);
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    await removeSecureToken()
    navigationReplace(navigation, 'Hub');
    dispatch(logout());
    dispatch(reset());
  };

  const handleOnPress = () => {
    setLoading(true)
    onPress && onPress();
    if (action === 'logout') {
      handleLogout();
    }
  };

  return (
    loading ? (
      <View className='p-2.5'> 
        <Text className="text-lg text-center text-tic">Goodbye!</Text>
      </View>
    ) : (
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
    )
  );
};

export default TicDriveAuthButton;
