import NotLogged from '@/components/auth/NotLogged';
import useJwtToken from '@/hooks/auth/useJwtToken';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import ChatCard from '@/components/ui/cards/chat/ChatCard';
import {ScrollView} from 'react-native-gesture-handler';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import ChatCardType from '@/types/ui/card/ChatCard';

const chats: ChatCardType[] = [
  {
    id: 1,
    image:
      'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png',
    name: 'Autofficina futura',
    lastAccess: '4h ago',
    lastTimeMessage: 'Yesterday',
    lastMessage: 'Thank you for you service!',
  },
  {
    id: 2,
    image:
      'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png',
    name: 'Autofficina futura',
    lastAccess: '2d ago',
    lastTimeMessage: 'Yesterday',
    lastMessage: 'Thank you for you service!',
  },
];

export default function UserChat() {
  const token = useJwtToken();

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar isLoginAvailable={false} />
        {token ? (
          <ScrollView className="w-full h-full">
            {chats.map(chat => (
              <ChatCard
                key={chat.id}
                image={chat.image}
                receiver={chat.name}
                lastAccess={chat.lastAccess}
                lastMessage={chat.lastMessage}
                whenLastMessage={chat.lastTimeMessage}
              />
            ))}
          </ScrollView>
        ) : (
          <NotLogged />
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
