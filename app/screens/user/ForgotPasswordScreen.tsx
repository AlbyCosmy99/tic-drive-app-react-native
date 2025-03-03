import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import {Colors} from '@/constants/Colors';
import {useState} from 'react';
import {Text, View} from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  return (
    <SafeAreaViewLayout>
      <TicDriveNavbar isLoginAvailable={false} />
      <View className="mx-6 mt-10">
        <Text className="text-xl font-medium">Password dimenticata</Text>
        <Text className="text-base font-medium text-tic mr-4 my-2">
          Inserisci la tua email per reimpostare la password
        </Text>
        <Text className="font-base font-semibold my-0.5">Your email</Text>
      </View>
      <View className="mx-3">
        <TicDriveInput
          isRightIcon
          customValue={email}
          onChange={e => setEmail(e)}
          placeholder="Insert your email"
          inputContainerStyle={{marginTop: 10}}
        />
      </View>
      <TicDriveButton
        disabled={!email}
        text="Reimposta password"
        customDisabledStyle={{backgroundColor: '#B0E0C3'}}
        customButtonStyle={{height: 56, borderRadius: 12, marginTop: 24}}
        customTitleStyle={{fontWeight: 700}}
        customContainerStyle={{marginHorizontal: 24}}
      />
    </SafeAreaViewLayout>
  );
};

export default ForgotPasswordScreen;
