import navigationPush from '@/services/navigation/push';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import useTicDriveNavigation from './navigation/useTicDriveNavigation';

type LinkingEvent = {
  url: string;
};

export default function useDeepLinking(screen: string) {
  const navigation = useTicDriveNavigation();
  useEffect(() => {
    const handleDeepLink = async (event: LinkingEvent | null) => {
      const url = event?.url || (await Linking.getInitialURL());

      if (url) {
        console.log('Deep link received:', url);
        navigationPush(navigation, screen);
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    handleDeepLink(null);

    return () => {
      subscription.remove();
    };
  }, [screen]);
}
