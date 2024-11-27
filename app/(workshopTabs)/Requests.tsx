import {Colors} from '@/constants/Colors';
import {SafeAreaView, Text, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import HorizontalLine from '@/components/ui/HorizontalLine';
import PrenotationRequestCard from '@/components/workshop/PrenotationRequestCard';
import {globalStyles} from '@/styles/globalStyles';
import SegmentedControl from '@/components/SegmentedControl';
import workshopRequestsDates from '@/constants/SegmentedControlOptions/WorkshopRequestsDates';
import {useEffect, useState} from 'react';
import WorkshopRequestsDate from '@/types/segmentedControlOptions/WorkshopRequestsDate';
import WorkshopRequestCards from '@/components/ui/cards/WorkshopRequestCards';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';

export default function WorkshopRequests() {
  const [selectedRequestDate, setSelectedRequestDate] =
    useState<WorkshopRequestsDate>(workshopRequestsDates[0]);

  useEffect(() => {
    console.log(selectedRequestDate);
  }, [selectedRequestDate]);
  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaViewLayout tailwindCss="mx-3.5">
        <TicDriveNavbar isLoginAvailable={false} canGoBack={false} />
        <Text className="font-semibold text-2xl mb-7 mt-2 text-3xl">
          Requests
        </Text>
        <SegmentedControl
          options={workshopRequestsDates}
          segmentedControlSelection={selectedRequestDate}
          setSegmentedControlSelection={setSelectedRequestDate}
        />
        <View className="mt-4">
          <HorizontalLine color={Colors.light.SegmentedControlBackground} />
        </View>
        <WorkshopRequestCards status="pending" />
      </SafeAreaViewLayout>
    </LinearGradient>
  );
}
