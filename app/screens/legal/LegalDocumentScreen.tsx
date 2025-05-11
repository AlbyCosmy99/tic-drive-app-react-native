import {ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ToPreviousPage from '@/components/navigation/ToPreviousPage';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import {useRoute} from '@react-navigation/native';
import {LegalDocument} from '@/types/legal/LegalDocument';
import privacyPolicySections from '@/constants/legal/privacyPolicySections';
import termsOfUseSections from '@/constants/legal/termsOfUseSections';

const LegalDocumentScreen = () => {
  const route = useRoute();
  const {type} = route?.params as {type: LegalDocument};
  const {t} = useTranslation();
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    if (type === 'privacyPolicy') {
      setSections(privacyPolicySections);
    }
    if (type === 'termsOfUse') {
      setSections(termsOfUseSections);
    }
  }, []);

  return (
    <SafeAreaViewLayout>
      <View className="flex-1 bg-white">
        <ToPreviousPage containerClassName="m-2" />
        <ScrollView contentContainerStyle={{padding: 20}}>
          <Text className="text-xl font-bold mb-4 font-[Poppins] ">
            {t(`${type}.title`)}
          </Text>

          <Text className="text-sm leading-6 mb-4 font-[Poppins] ">
            {t(`${type}.intro`)}
          </Text>

          {sections.map(section => (
            <React.Fragment key={section}>
              <Text className="text-base font-semibold mt-4 mb-2 font-[Poppins]">
                {t(`${type}.${section}.title`)}
              </Text>
              <Text className="text-sm leading-6 mb-4 font-[Poppins] ">
                {t(`${type}.${section}.content`)}
              </Text>
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
    </SafeAreaViewLayout>
  );
};

export default LegalDocumentScreen;
