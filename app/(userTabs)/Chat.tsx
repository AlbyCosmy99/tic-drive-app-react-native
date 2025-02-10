import NotLogged from '@/components/auth/NotLogged';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {View, Text} from 'react-native';

export default function UserChat() {
  const token = useJwtToken()
  
  if(!token) {
    return (
      <NotLogged />
    )
  }
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Chat</Text>
    </View>
  );
}
