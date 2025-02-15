import {View} from 'react-native';
import HorizontalLine from '../../HorizontalLine';
import CircularUserAvatar from '../../avatars/CircularUserAvatar';
import {Text} from '@rneui/themed';
import ChatCardType from '@/types/ui/card/ChatCard';
import {Colors} from '@/constants/Colors';
import CrossPlatformButtonLayout from '../../buttons/CrossPlatformButtonLayout';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import navigationPush from '@/services/navigation/push';

const chat: ChatCardType = {
  id: 1,
  image:
    'https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltc86e7943bcc0e006/6569cbef0b642304079a348b/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0',
  name: 'Autofficina futura',
  lastAccess: 'Ultimo accesso 4h fa',
  lastTimeMessage: 'Yesterday',
  lastMessage: 'Thank you for you service!',
};

const ChatCard = () => {
  const navigation = useTicDriveNavigation();
  return (
    <CrossPlatformButtonLayout
      onPress={() => navigationPush(navigation, 'ChatScreen')}
      removeAllStyles
    >
      <HorizontalLine />
      <View className="flex-row px-3 py-2">
        <CircularUserAvatar
          styles={{
            width: 70,
            height: 70,
            marginRight: 10,
          }}
          uri={chat.image}
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text style={{fontWeight: 700, fontSize: 18}}>{chat.name}</Text>
            <Text style={{fontWeight: 300}}>{chat.lastTimeMessage}</Text>
          </View>
          <Text style={{color: Colors.light.ticText, fontWeight: 400}}>
            {chat.lastAccess}
          </Text>
          <Text
            style={{color: Colors.light.ticText, fontWeight: 600, marginTop: 2}}
          >
            {chat.lastMessage}
          </Text>
        </View>
      </View>
      <HorizontalLine />
    </CrossPlatformButtonLayout>
  );
};

export default ChatCard;
