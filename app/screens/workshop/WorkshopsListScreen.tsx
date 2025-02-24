import {Colors} from '@/constants/Colors';
import {View} from 'react-native';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInput from '@/components/ui/inputs/TicDriveInput';
import WorkshopCards from '@/components/WorkshopCards';
import {useContext} from 'react';
import HorizontalLine from '@/components/ui/HorizontalLine';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import LinearGradientViewLayout from '@/app/layouts/LinearGradientViewLayout';
import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import {useRoute} from '@react-navigation/native';

export default function WorkshopsListScreen() {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const route = useRoute();
  const {favorite} = route.params as {favorite: boolean};
  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar isLoginAvailable={false} />
        <View className="flex-row items-center">
          <TicDriveInput
            isLeftIcon={true}
            isRightIcon={true}
            placeholder="Search workshop"
            containerViewStyleTailwind="flex-1 justify-center items-center"
            inputContainerStyle={{marginTop: 4, height: 48}}
            onChange={text => {
              setWorkshopFilter(text);
            }}
          />
        </View>
        <HorizontalLine color={Colors.light.lightGrey} />
        <View className="flex-1">
          <WorkshopCards tailwindContainerCss="mb-0" favorite={favorite} />
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
