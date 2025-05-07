import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import ToPreviousPage from '@/components/navigation/ToPreviousPage';

const PrivacyPolicyScreen = () => {
  const {t} = useTranslation();

  const sections = [
    'whoIsController',
    'whatIsPersonalData',
    'whatIsProcessing',
    'applicableLaw',
    'legalBases',
    'collectedData',
    'locationAndDevice',
    'thirdParties',
    'otherUses',
    'storageRetention',
    'yourRights',
    'dataBreaches',
    'supervisoryAuthority',
    'policyChanges',
  ];

  return (
    <View className="flex-1 bg-white">
      <ToPreviousPage containerClassName="m-2 mb-4" />
      <ScrollView contentContainerStyle={{padding: 20}}>
        <Text className="text-xl font-bold mb-4 font-[Poppins] ">
          {t('privacyPolicy.title')}
        </Text>

        <Text className="text-sm leading-6 mb-4 font-[Poppins] ">
          {t('privacyPolicy.intro')}
        </Text>

        {sections.map(section => (
          <React.Fragment key={section}>
            <Text className="text-base font-semibold mt-4 mb-2 font-[Poppins]">
              {t(`privacyPolicy.${section}.title`)}
            </Text>
            <Text className="text-sm leading-6 mb-4 font-[Poppins] ">
              {t(`privacyPolicy.${section}.description`)}
            </Text>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
