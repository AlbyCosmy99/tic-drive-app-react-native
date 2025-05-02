import {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';

import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import PlusIcon from '@/components/svgs/Plus';
import MinusIcon from '@/components/svgs/Minus';
import {useTranslation} from 'react-i18next';
import {useMemo} from 'react';

export default function FAQScreen() {
  const {t} = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqData = useMemo(
    () => [
      {
        question: t('faq.question_1'),
        answer: t('faq.answer_1'),
      },
      {
        question: t('faq.question_2'),
        answer: t('faq.answer_2'),
      },
      {
        question: t('faq.question_3'),
        answer: t('faq.answer_3'),
      },
      {
        question: t('faq.question_4'),
        answer: t('faq.answer_4'),
      },
    ],
    [t],
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter(
    item =>
      item.question.toLowerCase().includes(searchText.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar />
        <View className="items-center mt-6 px-4">
          <Text className="text-2xl leading-6 font-semibold text-center font-poppins">
            {t('faq.title')}
          </Text>
          <Text className="text-lg leading-[24px] font-semibold font-poppins text-center">
            {t('faq.subtitle')}
          </Text>
        </View>

        <View className="mx-4">
          <TicDriveInput
            isLeftIcon
            isRightIcon
            placeholder={t('faq.search_placeholder')}
            customValue={searchText}
            onChange={setSearchText}
            containerViewStyleTailwind="w-full"
            inputContainerStyle={{marginBottom: 12, height: 48}}
          />
        </View>

        <View className="flex-row justify-between items-center px-4  mb-2">
          <Text className="text-base font-semibold text-black font-poppins">
            {t('faq.most_frequent')}
          </Text>
          <Text className="text-sm font-semibold text-green-600 font-poppins">
            {t('faq.see_all')}
          </Text>
        </View>

        <ScrollView className="px-4">
          {filteredFAQs.map((item, index) => {
            const isExpanded = index === expandedIndex;

            return (
              <View
                key={index}
                className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
              >
                <CrossPlatformButtonLayout
                  onPress={() => toggleExpand(index)}
                  buttonTailwindCss="flex-row justify-between items-center"
                >
                  <Text className="text-base font-medium text-black flex-1 pr-2">
                    {item.question}
                  </Text>

                  <View>
                    {isExpanded ? (
                      <MinusIcon width={25.26} height={24} />
                    ) : (
                      <PlusIcon width={25.26} height={24} />
                    )}
                  </View>
                </CrossPlatformButtonLayout>

                {isExpanded && (
                  <Text className="mt-3 text-[12px] leading-[20px] text-[#737373] font-poppins">
                    {item.answer}
                  </Text>
                )}
              </View>
            );
          })}

          {filteredFAQs.length === 0 && (
            <Text className="text-center text-gray-500 mt-6 font-poppins">
              {t('faq.no_results')}
            </Text>
          )}
        </ScrollView>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
