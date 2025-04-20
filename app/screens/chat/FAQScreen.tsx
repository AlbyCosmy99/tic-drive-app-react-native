import {useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Feather, AntDesign} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';

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
      item.answer.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <View className="flex-1 pt-16">
          <TicDriveNavbar />
          <View className="items-center mt-4">
            <Text className="text-2xl font-bold text-black">
              Frequently Asked Questions
            </Text>
            <Text className="text-base text-gray-500">
              How can we help you?
            </Text>
          </View>

          <View className="mx-4">
            <TicDriveInput
              isLeftIcon={true}
              placeholder="Search by keyword"
              customValue={searchText}
              onChange={setSearchText}
              isRightIcon
              containerViewStyleTailwind="w-full"
              inputContainerStyle={{marginBottom: 12, height: 48}}
            />
          </View>

          <View className="flex-row justify-between items-center px-4 mt-4 mb-2">
            <Text className="text-lg font-semibold text-black">
              Most frequently asked
            </Text>
            <Text className="text-sm font-semibold text-green-600">
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
                    <Text className="text-base font-medium text-black flex-1 pr-2">
                      {item.question}
                    </Text>
                    <AntDesign
                      name={isExpanded ? 'minus' : 'plus'}
                      size={20}
                      color="red"
                    />
                  </CrossPlatformButtonLayout>
                  {isExpanded && (
                    <Text className="mt-3 text-gray-700 text-sm leading-relaxed">
                      {item.answer}
                    </Text>
                  )}
                </View>
              );
            })}
            {filteredFAQs.length === 0 && (
              <Text className="text-center text-gray-500 mt-6">
                No results found.
              </Text>
            )}
          </ScrollView>
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
