import NotLogged from '@/components/auth/NotLogged';
import useJwtToken from '@/hooks/auth/useJwtToken';
import {View, Text} from 'react-native';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import HorizontalLine from '@/components/ui/HorizontalLine';
import {Image} from '@rneui/themed';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import ChatCard from '@/components/ui/cards/chat/ChatCard';
import {ScrollView} from 'react-native-gesture-handler';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import ChatCardType from '@/types/ui/card/ChatCard';

const chats: ChatCardType[] = [
  {
    id: 1,
    image:
      'https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltc86e7943bcc0e006/6569cbef0b642304079a348b/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0',
    name: 'Autofficina futura',
    lastAccess: 'Ultimo accesso 4h fa',
    lastTimeMessage: 'Yesterday',
    lastMessage: 'Thank you for you service!',
  },
  {
    id: 2,
    image:
      'https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltc86e7943bcc0e006/6569cbef0b642304079a348b/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0',
    name: 'Autofficina futura',
    lastAccess: 'Ultimo accesso 4h fa',
    lastTimeMessage: 'Yesterday',
    lastMessage: 'Thank you for you service!',
  }
];

export default function UserChat() {
  const token = useJwtToken();

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar isLoginAvailable={false} />
        {token ? (
          <ScrollView className="w-full h-full">
            {chats.map(chat => <ChatCard key={chat.id}  image={chat.image} receiver={chat.name} lastAccess={chat.lastAccess} lastMessage={chat.lastMessage} whenLastMessage={chat.lastTimeMessage}/>)}
          </ScrollView>
        ) : (
          <NotLogged />
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
