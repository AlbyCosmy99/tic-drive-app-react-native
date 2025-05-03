import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import TicDriveButton from '@/components/ui/buttons/TicDriveButton';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import PaymentConfirmationCard from '@/components/ui/cards/payment/PaymentConfirmationCard';

type RouteParams = {
  SendAReview: {
    workshop: any;
    car: any;
  };
};

export default function SendAReviewScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const route = useRoute();
  const { workshop, car } = route.params as RouteParams['SendAReview'];

  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleStarPress = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    console.log('Review Submitted:', { workshop, car, rating, reviewText });
    navigation.navigate('Bookings');
  };

  const renderStars = () => (
    <View className="flex-row space-x-2 mt-2">
      {[1, 2, 3, 4, 5].map(i => (
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={35}
            color={i <= rating ? '#FFD029' : '#D3D3D3'}
            className={`w-9 h-9 border-2 border-solid 
                        ${i <= rating ? 'bg-[#FFD029] border-white' : 'bg-transparent border-[#D3D3D3]'}`}
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={isAndroidPlatform()}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TicDriveNavbar />

          <View className="px-5 pt-6 pb-8 flex-1">
            {/* Title */}
            <View className="items-center mb-4 mt-[-20px]">
              <Text className="text-center text-[#170F49] font-poppins font-bold text-2xl leading-none">
                {t('sendrtitle')}
              </Text>
              <Text className="text-center text-[#170F49] font-poppins font-semibold text-lg leading-none">
                {t('sendrsubtitle')}
              </Text>
            </View>

            {/* Workshop Card */}
            <View className="mb-2 shadow-lg rounded-lg bg-white">
              <PaymentConfirmationCard
                showDirectionsButton={false}
                showReminderBell={false}
                workshop={workshop}
                service={workshop.service}
                timeDate={t('workshop.dateTime', 'Martedì, 24 gennaio ore 10:00')}
                type={t('status.completed', 'Completato')}
                showLocation={false}
                showPayment={false}
              />
            </View>

            {/* Review Form */}
            <View className="mt-6 mb-6">
              <Text className="text-base font-bold font-poppins leading-[20px] text-[#170F49]">
                {t('reviewScreen.rateService')}
              </Text>

              {renderStars()}
            </View>

            <View className="mb-2 shadow-lg">
              <Text className="text-base font-bold font-poppins leading-[20px] text-[#170F49] mb-2">
                {t('reviewScreen.leaveReview')}
              </Text>
              <View className="w-[360px] h-[168px] bg-white font-poppins rounded-[20px] border border-[#EFF0F6] shadow-md self-center p-4">
                <TextInput
                  placeholder={t('reviewScreen.placeholder')}
                  multiline
                  numberOfLines={4}
                  value={reviewText}
                  onChangeText={setReviewText}
                  textAlignVertical="top"
                  placeholderTextColor="gray"
                  className="text-base text-gray-800 flex-1"
                />
              </View>

              <View className="items-end">
                <TicDriveButton
                  text={t('common.submit')}
                  onPress={handleSubmit}
                  customButtonStyle={{ backgroundColor: 'transparent', paddingVertical: 0, paddingHorizontal: 0 }}
                  customTitleStyle={{ color: '#FF0000', fontWeight: 'bold', fontSize: 14 }}
                />
              </View>
            </View>

            {/* Navigate to Bookings Button  i will fix this */}
            <TicDriveButton
              text={t('common.home')}
              onPress={() => navigation.navigate('Bookings')}
              customButtonStyle="bg-[#39B269] py-2"
              customTitleStyle="text-white font-bold text-lg"
              customContainerStyle="w-full mt-4"
            />
          </View>
        </ScrollView>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
