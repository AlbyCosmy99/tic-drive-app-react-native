import {Colors} from '@/constants/Colors';
import {Pressable, ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import {LinearGradient} from 'expo-linear-gradient';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import SafeAreaViewLayout from '../layouts/SafeAreaViewLayout';
import CircularUserAvatar from '@/components/ui/avatars/CircularUserAvatar';
import HorizontalLine from '@/components/ui/HorizontalLine';
import TicDriveOptionButton from '@/components/ui/buttons/TicDriveOptionButton';
import AddIcon from '../../assets/svg/add.svg';
import UserCarCard from '@/components/ui/cards/user/UserCarCard';
import UserCarCards from '@/components/ui/cards/user/UserCarCards';
import navigationPush from '@/services/navigation/push';
import { useContext } from 'react';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';

export default function UserAccount() {
  const user = useAppSelector(state => state.auth.user);
  const {navigation} = useContext(NavigationContext); 

  return (
    <LinearGradient
      colors={[
        Colors.light.backgroundLinearGradient.start,
        Colors.light.backgroundLinearGradient.end,
      ]}
      className="flex-1 w-full h-full"
    >
      <SafeAreaViewLayout tailwindCss="mx-3.5">
        <TicDriveNavbar
          isLoginAvailable={false}
        />
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className="font-bold text-2xl text-center mb-2 mt-1">
            My Account
          </Text>
          <Pressable onPress={() => navigationPush(navigation, 'UserAccountDetailsScreen')}><Text className="text-3xl">☰</Text></Pressable>
        </View>
        <View className="flex flex-row items-center mb-4">
          <CircularUserAvatar
            styles={{
              width: 70,
              height: 70,
              marginRight: 10,
            }}
            uri="https://images.ladbible.com/resize?type=webp&quality=70&width=3840&fit=contain&gravity=auto&url=https://images.ladbiblegroup.com/v3/assets/bltb5d92757ac1ee045/bltc86e7943bcc0e006/6569cbef0b642304079a348b/AI-creates-what-the-average-person.png%3Fcrop%3D590%2C590%2Cx0%2Cy0"
          />
          <View>
            <Text className="font-semibold text-xl">Andrei Albu</Text>
            <Text className="text-tic">New Your, USA</Text>
          </View>
        </View>
        <HorizontalLine color={Colors.light.lightGrey} />
        <View className="flex flex-row justify-between items-center my-4 mx-2">
          <View className="flex gap-0.5">
            <Text className="font-semibold text-lg">My vehicles</Text>
            <Text className="text-tic">3 vehicles registered</Text>
          </View>
          <TicDriveOptionButton text="Register new" icon={<AddIcon />} />
        </View>
        <HorizontalLine color={Colors.light.lightGrey} />
        <ScrollView className="px-4 mb-2">
          <UserCarCards />
        </ScrollView>
      </SafeAreaViewLayout>
    </LinearGradient>
  );
}
