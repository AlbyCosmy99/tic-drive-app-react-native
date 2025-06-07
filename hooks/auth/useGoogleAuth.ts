import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {useEffect} from 'react';

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth(onSuccess: (idToken: string) => void) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '120087724412-1sujejkvirmgjbr8pc3i54k13igeqlgp.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.authentication?.idToken;
      if (idToken) onSuccess(idToken);
    }
  }, [response]);

  return {signInWithGoogle: () => promptAsync()};
}
