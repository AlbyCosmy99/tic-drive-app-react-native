import {Colors} from '@/constants/Colors';
import {Text, StyleSheet, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import WorkshopRequestCards from '@/components/ui/cards/WorkshopRequestCards';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import SegmentedControl from '@/components/SegmentedControl';
import {useState} from 'react';
import WorkshopRequestsDate from '@/types/segmentedControlOptions/WorkshopRequestsDate';
import workshopRequestsDates from '@/constants/SegmentedControlOptions/WorkshopRequestsDates';
import HorizontalLine from '@/components/ui/HorizontalLine';
import LinearGradientViewLayout from '../layouts/LinearGradientViewLayout';

export default function WorkshopBookings() {
  const [selectedRequestDate, setSelectedRequestDate] =
    useState<WorkshopRequestsDate>(workshopRequestsDates[0]);
  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout tailwindCss="mx-3.5">
        <TicDriveNavbar isLoginAvailable={false} canGoBack={false} />
        <Text className="font-semibold text-2xl mb-7 mt-2 text-3xl">
          Bookings
        </Text>
        <SegmentedControl
          options={workshopRequestsDates}
          segmentedControlSelection={selectedRequestDate}
          setSegmentedControlSelection={setSelectedRequestDate}
        />
        <View className="mt-4">
          <HorizontalLine color={Colors.light.lightGrey} />
        </View>
        <WorkshopRequestCards status="accepted" />
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}

const styles = StyleSheet.create({});
