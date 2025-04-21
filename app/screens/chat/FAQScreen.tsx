import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import PlusIcon from '@/assets/svg/plus.svg';
import MinusIcon from '@/assets/svg/minus.svg';

const faqData = [
  {
    question: 'How do I book a service on TicDrive?',
    answer:
      'Open the TicDrive app or website, enter your vehicle details and location, then select the service type and time. Booking is easy and fast.',
  },
  {
    question: 'How can I add or update a payment method?',
    answer:
      'Go to your profile and tap on "Payment Methods" to add or update your preferred option.',
  },
  {
    question: 'Can I book a service on the weekend?',
    answer:
      'Yes, you can schedule services any day of the week, including weekends.',
  },
  {
    question: 'Can I cancel or modify a booking?',
    answer:
      'Yes, bookings can be cancelled or changed at least 24 hours before the scheduled time.',
  },
];

export default function FAQScreen() {
  const [searchText, setSearchText] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFAQs = faqData.filter(
    item =>
      item.question.toLowerCase().includes(searchText.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar />

        <View className="items-center mt-6 px-4">
          <Text className="text-[24px] leading-6 font-semibold text-center text-[#170F49] font-poppins">
            Frequently Asked Questions{'\n'}
            <Text className="text-[18px] leading-[18px] font-semibold font-poppins text-[#170F49]">
              How can we help you?
            </Text>
          </Text>
        </View>

        <View className="mx-4 mt-4">
          <TicDriveInput
            isLeftIcon
            isRightIcon
            placeholder="Search by keyword"
            customValue={searchText}
            onChange={setSearchText}
            containerViewStyleTailwind="w-full"
            inputContainerStyle={{ marginBottom: 1, height: 48 }}
          />
        </View>

        <View className="flex-row justify-between items-center px-4  mb-2">
          <Text className="text-base font-semibold text-black font-poppins">
            Most frequently asked
          </Text>
          <Text className="text-sm font-semibold text-green-600 font-poppins">
            See all
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
                  removeAllStyles
                  buttonTailwindCss="flex-row justify-between items-center"
                >
                  <Text className="text-[15px] leading-[20px] font-medium text-black flex-1 pr-2 font-poppins">
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
              No results found.
            </Text>
          )}
        </ScrollView>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
