import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveAuthButton from '@/components/ui/buttons/TicDriveAuthButton';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import {Pressable, Text, View} from 'react-native';

const ConfirmEmailScreen = () => {
  let user = useAppSelector(state => state.auth.user);

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout tailwindCss="mx-3.5">
        <TicDriveNavbar />
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-3xl font-medium m-1.5 mb-3">
            Welcome {user?.name}!
          </Text>
          <Text className="text-lg font-bold text-center mb-4">
            Please confirm your email address.
          </Text>
          <Text className="text-sm text-center text-gray-600 mb-4">
            We have sent a confirmation email to your registered address. Please
            check your inbox (and spam folder) and click the confirmation link
            to activate your account.
          </Text>
          <Pressable>
            <Text className="underline text-md">Resend Confirmation Email</Text>
          </Pressable>
          <TicDriveButton
            text="I confirmed the email"
            customContainerStyle={{marginTop: 40}}
          />
        </View>
        <TicDriveAuthButton action="logout" />
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
};

export default ConfirmEmailScreen;
