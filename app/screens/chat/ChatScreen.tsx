import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import ToPreviousPage from '@/components/navigation/ToPreviousPage';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import {useRoute} from '@react-navigation/native';
import {Text, View} from 'react-native';

const ChatScreen = () => {
  const route = useRoute();

  const {image, receiver, lastAccess} = route.params as {
    image: string;
    receiver: string;
    lastAccess: string;
  };
  return (
    <SafeAreaViewLayout>
      <View className="w-full h-full flex flex-col relative">
        <View className="flex flex-row absolute items-center">
          <View className="mx-2">
            <ToPreviousPage />
          </View>
          <CircularUserAvatar uri={image} />
        </View>
        <View className="flex flex-col self-center">
          <Text className="text-xl font-semibold text-center">{receiver}</Text>
          <Text className="text-tic font-normal text-sm text-center">
            Last access {lastAccess}
          </Text>
        </View>
      </View>
    </SafeAreaViewLayout>
  );
};

export default ChatScreen;
