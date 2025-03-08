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
import {useTranslation} from 'react-i18next';
import IconTextPair from '@/components/ui/IconTextPair';
import OrderIcon from '@/assets/svg/operations/order.svg';
import FilterIcon from '@/assets/svg/operations/filter.svg';
import MapIcon from '@/assets/svg/location/map.svg';

export default function WorkshopsListScreen() {
  const {setWorkshopFilter} = useContext(GlobalContext);
  const route = useRoute();
  const {t} = useTranslation();
  const {favorite} = route.params as {favorite: boolean};
  return (
    <LinearGradientViewLayout>
      <SafeAreaViewLayout>
        <TicDriveNavbar />
        <View className="flex-row items-center flex-col h-[100px] relative">
          <TicDriveInput
            isLeftIcon={true}
            isRightIcon={true}
            placeholder={t('workshops.searchWorkshop')}
            containerViewStyleTailwind="flex-1 items-center"
            inputContainerStyle={{marginTop: 4, height: 48}}
            onChange={text => {
              setWorkshopFilter(text);
            }}
          />
          <View className="flex-row justify-between mx-1 mb-2 absolute bottom-0">
            <IconTextPair
              text="Order"
              icon={<OrderIcon />}
              textTailwindCss="text-base font-medium text-tic"
              containerTailwindCss="flex-1 border border-tic justify-center items-center gap-0 p-1 rounded-2xl mx-1"
              iconContainerTailwindCss="mr-1"
            />
            <IconTextPair
              text="Filter"
              icon={<FilterIcon />}
              textTailwindCss="text-base font-medium text-tic"
              containerTailwindCss="flex-1 border border-tic justify-center items-center gap-0 p-1 rounded-2xl mx-1"
              iconContainerTailwindCss="mr-1"
            />
            <IconTextPair
              text="Map"
              icon={<MapIcon />}
              textTailwindCss="text-base font-medium text-tic"
              containerTailwindCss="flex-1 border border-tic justify-center items-center gap-0 p-1 rounded-2xl mx-1"
              iconContainerTailwindCss="mr-1"
            />
          </View>
        </View>

        <HorizontalLine color={Colors.light.lightGrey} />
        <View className="flex-1">
          <WorkshopCards tailwindContainerCss="mb-0" favorite={favorite} />
        </View>
      </SafeAreaViewLayout>
    </LinearGradientViewLayout>
  );
}
