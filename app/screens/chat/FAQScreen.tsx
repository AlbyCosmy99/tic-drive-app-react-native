import {ScrollView, Text, View} from 'react-native';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import isAndroidPlatform from '@/utils/devices/isAndroidPlatform';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';

export default function FAQScreen() {
  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout disabled={!isAndroidPlatform()}>
        <View className="flex-1 pt-16">
          <TicDriveNavbar />
          <ScrollView className="p-4">
            <Text className="text-2xl font-bold mb-4">FAQ</Text>

            {/* FAQ Section 1 */}
            <View className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
              <Text className="font-medium text-lg">1. What is TicDrive?</Text>
              <Text className="text-sm">
                TicDrive is an innovative platform for vehicle-related
                services...
              </Text>
            </View>

            {/* FAQ Section 2 */}
            <View className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
              <Text className="font-medium text-lg mt-2">
                2. How do I register a vehicle?
              </Text>
              <Text className="text-sm">
                To register a vehicle, go to your profile and click on 'Add
                Vehicle'.
              </Text>
            </View>

            {/* FAQ Section 3 */}
            <View className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
              <Text className="font-medium text-lg mt-2">
                3. How do I contact customer support?
              </Text>
              <Text className="text-sm">
                You can contact customer support by clicking on the 'Customer
                Support' button.
              </Text>
            </View>

            {/* FAQ Section 4 */}
            <View className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm">
              <Text className="font-medium text-lg mt-2">
                4. How do I update my profile?
              </Text>
              <Text className="text-sm">
                To update your profile, click on the 'Edit' button next to your
                name in your profile section.
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
