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

export default function UserChat() {
  const token = useJwtToken();

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <TicDriveNavbar isLoginAvailable={false} />
        {token ? (
          <ScrollView className="w-full h-full">
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
            <ChatCard />
          </ScrollView>
        ) : (
          <NotLogged />
        )}
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
