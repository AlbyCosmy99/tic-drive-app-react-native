import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ToPreviousPage from '@/components/navigation/ToPreviousPage';

const TermsAndConditionsScreen = () => {
  const { t } = useTranslation();

  const sections = [
    'general_terms',
    'license_grant',
    'account_and_password',
    'account_suspension_termination',
    'end_of_life',
    'service_levels_and_support',
    'data_charges_and_mobile_devices',
    'technical_error',
    'technical_requirements',
    'uploading_content',
    'warranties',
    'submissions',
    'limitation_of_liability',
    'termination',
    'communication',
    'events_outside_our_control',
    'other_important_terms',
  ];

  return (
    <View className="flex-1 bg-white">
      <ToPreviousPage containerClassName="m-2 mb-4" />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text className="text-xl font-bold mb-4 font-[Poppins] ">
          {t('terms_of_use.title')}
        </Text>

        <Text className="text-sm leading-6 mb-4 font-[Poppins] ">
          {t('terms_of_use.introduction')}
        </Text>

        {sections.map((sectionKey) => (
          <React.Fragment key={sectionKey}>
            <Text className="text-base font-semibold mt-4 mb-2 font-[Poppins]">
              {t(`terms_of_use.sections.${sectionKey}.title`)}
            </Text>
            <Text className="text-sm leading-6 mb-4 font-[Poppins] ">
              {t(`terms_of_use.sections.${sectionKey}.content`)}
            </Text>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

export default TermsAndConditionsScreen;
