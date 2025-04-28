import {View} from 'react-native';
import HorizontalLine from '../../HorizontalLine';
import CircularUserAvatar from '../../avatars/CircularUserAvatar';
import {Text} from '@rneui/themed';
import {Colors} from '@/constants/Colors';
import CrossPlatformButtonLayout from '../../buttons/CrossPlatformButtonLayout';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';

interface ChatCardProps {
  image: string;
  receiver: string;
  lastAccess: string;
  lastMessage: string;
  whenLastMessage: string;
}

const ChatCard: React.FC<ChatCardProps> = ({
  receiver,
  lastAccess,
  lastMessage,
  whenLastMessage,
  image,
}) => {
  const navigation = useTicDriveNavigation();
  return (
    <CrossPlatformButtonLayout
      onPress={() =>
        navigationPush(navigation, 'ChatScreen', {image, receiver, lastAccess})
      }
    >
      <HorizontalLine />
      <View className="flex-row px-3 py-2">
        <CircularUserAvatar
          styles={{
            width: 70,
            height: 70,
            marginRight: 10,
          }}
          uri={image}
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text style={{fontWeight: 700, fontSize: 18}}>{receiver}</Text>
            <Text style={{fontWeight: 300}}>{whenLastMessage}</Text>
          </View>
          <Text style={{color: Colors.light.ticText, fontWeight: 400}}>
            {lastAccess}
          </Text>
          <Text
            style={{color: Colors.light.ticText, fontWeight: 600, marginTop: 2}}
          >
            {lastMessage}
          </Text>
        </View>
      </View>
      <HorizontalLine />
    </CrossPlatformButtonLayout>
  );
};

export default ChatCard;
