import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import RemoveIcon from '@/components/svgs/Remove';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';

export default function DeleteAccountScreen() {
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleDelete = () => {
    if (password !== 'correctPassword') {
      setPasswordError(true);
    } else {
      // Trigger deletion
    }
  };

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={isAndroidPlatform()}>
        <TicDriveNavbar canGoBack />

        <ScrollView className="flex-1 px-4 mt-2">
          <View className="flex-row items-center justify-center mt-8 mb-3 space-x-2">
            <RemoveIcon width={28} height={28} />
            <Text className="text-[24px] leading-[25px] font-bold text-[#737373] font-poppins">
              Elimina Account
            </Text>
          </View>

          <Text className="text-[16px] leading-[17px] text-[#737373] font-poppins mt-6 mb-2">
            Motivo dell'eliminazione
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 bg-white"
            placeholder="Motivo*"
            placeholderTextColor="#999"
            value={reason}
            onChangeText={setReason}
          />

          <Text className="text-[16px] leading-[17px] text-[#737373] font-poppins mt-6 mb-2">
            Inserisci la tua password attuale per procedere con l'eliminazione dell'account.
          </Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 bg-white"
            placeholder="Inserisci la tua password*"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError(false);
            }}
          />

          {passwordError && (
            <Text className="text-red-600 font-medium mt-1 text-right font-poppins">
              Password non valida
            </Text>
          )}

          <TouchableOpacity
            className="bg-red-600 mt-16 py-4 rounded-2xl shadow-md active:opacity-80"
            onPress={handleDelete}
          >
            <Text className="text-[20px] leading-[20px] text-white text-center font-bold font-poppins">
              Elimina account
            </Text>
          </TouchableOpacity>

          <View className="pt-16">
            <Text className="text-xs text-red-600 font-poppins">
              L'eliminazione del tuo account è permanente e non può essere annullata. Assicurati di aver
              salvato tutti i dati importanti prima di procedere. Se hai dubbi, puoi sempre annullare il
              processo di eliminazione.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
