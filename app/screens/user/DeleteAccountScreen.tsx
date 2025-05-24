import {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import RemoveIcon from '@/assets/svg/remove.svg';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';

export default function DeleteAccountScreen() {
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');
  const {setErrorMessage} = useGlobalErrors();

  const handleDelete = () => {
    if (password !== 'correctPassword') {
      setErrorMessage('Wrong password.');
    } else {
    }
  };

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={isAndroidPlatform()}>
        <TicDriveNavbar canGoBack />

        <View className="flex-1 px-4 flex justify-between">
          <View>
            <View className="flex-row items-center justify-center mt-8 mb-3 space-x-2">
              <RemoveIcon width={28} height={28} />
              <Text className="text-2xl font-bold text-tic font-poppins">
                Elimina Account
              </Text>
            </View>

            <Text className="text-lg text-tic font-normal mt-6 mx-2.5">
              Motivo dell'eliminazione
            </Text>
            <TicDriveInput
              existsRightIcon
              placeholder="Motivo*"
              customValue={reason}
              onChange={setReason}
            />
            <Text className="text-lg text-tic font-normal mt-6 mx-2.5">
              Inserisci la tua password attuale per procedere con l'eliminazione
              dell'account.
            </Text>
            <TicDriveInput
              isPassword
              existsRightIcon
              textContentType="password"
              placeholder="Inserisci la tua password*"
              customValue={password}
              onChange={text => {
                setPassword(text);
              }}
            />

            <CrossPlatformButtonLayout
              containerTailwindCss="bg-[#FF0000] mt-16 py-4 rounded-2xl shadow-md active:opacity-80"
              onPress={handleDelete}
              disabled={!reason || !password}
            >
              <Text className="text-xl leading-[20px] text-white text-center font-bold font-poppins">
                Elimina account
              </Text>
            </CrossPlatformButtonLayout>
          </View>

          <Text className="text-xs text-[#FF0000] font-normal">
            L'eliminazione del tuo account è permanente e non può essere
            annullata. Assicurati di aver salvato tutti i dati importanti prima
            di procedere. Se hai dubbi, puoi sempre annullare il processo di
            eliminazione.
          </Text>
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
