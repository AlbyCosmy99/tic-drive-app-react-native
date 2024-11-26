import {Colors} from '@/constants/Colors';
import { Text, StyleSheet} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import WorkshopRequestCards from '@/components/ui/cards/WorkshopRequestCards';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import SegmentedControl from '@/components/SegmentedControl';
import { useState } from 'react';
import WorkshopRequestsDate from '@/types/segmentedControlOptions/WorkshopRequestsDate';
import workshopRequestsDates from '@/constants/SegmentedControlOptions/WorkshopRequestsDates';

export default function WorkshopBookings() {
  const [selectedRequestDate, setSelectedRequestDate] = useState<WorkshopRequestsDate>(workshopRequestsDates[0])
  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaViewLayout tailwindCss='mx-3.5'>
        <TicDriveNavbar isLoginAvailable={false} canGoBack={false} />
        <Text className="font-semibold text-2xl mb-7 mt-2 text-3xl">
          Bookings
        </Text>
        <SegmentedControl 
          options={workshopRequestsDates}
          segmentedControlSelection={selectedRequestDate}
          setSegmentedControlSelection={setSelectedRequestDate}
        />
        <WorkshopRequestCards status='accepted'/>
      </SafeAreaViewLayout>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
