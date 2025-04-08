import React, {memo, useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import navigationPush from '@/services/navigation/push';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import useWorkshops from '@/hooks/api/workshops/useWorkshops';
import TicDriveButton from './ui/buttons/TicDriveButton';
import navigationReset from '@/services/navigation/reset';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {useFocusEffect} from 'expo-router';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import TicDriveInfinitePaginationList from './ui/Lists/TicDriveInfinitePaginationList';
import {useState} from 'react';
import Workshop from '@/types/workshops/Workshop';
import WorkshopCard from './WorkshopCard';
import CrossPlatformButtonLayout from './ui/buttons/CrossPlatformButtonLayout';

interface WorkshopCardsProps {
  setAreNoWorkshop?: (areNoWorkshops: boolean) => void;
  favorite?: boolean;
  order?: 'asc' | 'desc';
}

const WorkshopCards: React.FC<WorkshopCardsProps> = ({
  setAreNoWorkshop = () => {},
  favorite = false,
  order = 'asc',
}) => {
  const {workshopFilter, setWorkshopFilter} = useContext(GlobalContext);
  const navigation = useTicDriveNavigation();

  const servicesChoosen = useServicesChoosenByUsers();
  const workshopsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const {workshops, loadingWorkshops, setLoadingWorkshops, count} =
    useWorkshops(
      (currentPage - 1) * workshopsPerPage,
      workshopsPerPage,
      servicesChoosen.length > 0 ? servicesChoosen[0]?.id : 0,
      favorite,
      {order, filter: workshopFilter},
    );
  const dispatch = useAppDispatch();

  useEffect(() => {
    setCurrentPage(1);
    console.log(servicesChoosen);
  }, [workshopFilter, order]);

  useEffect(() => {
    setAreNoWorkshop(false);
  }, [workshopFilter, setAreNoWorkshop]);

  useFocusEffect(() => {
    dispatch(setSelectedWorkshop(null));
  });

  const handleChooseDifferentService = () => {
    dispatch(reset());
    navigationPush(navigation, 'ChooseServicesScreen');
  };

  const handleCardPress = (workshop: Workshop) => {
    dispatch(setSelectedWorkshop(workshop));
    navigationPush(navigation, 'WorkshopDetails');
  };

  return (
    <TicDriveInfinitePaginationList
      loading={loadingWorkshops}
      count={count}
      setLoadingData={setLoadingWorkshops}
      dataPerPage={workshopsPerPage}
      data={workshops}
      filter={workshopFilter}
      setFilter={setWorkshopFilter}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      noDataContent={
        <View className="flex-1 justify-center items-center mx-2.5">
          <Text className="text-lg text-gray-600 text-center">
            No workshop found. Try with a different service, or go to the
            dashboard.
          </Text>
          <TicDriveButton
            text="Look for a different service"
            onClick={handleChooseDifferentService}
          />
          <TicDriveButton
            text="Go back to dashboard"
            onClick={() => navigationReset(navigation, 0, 'Hub', 'Home')}
          />
        </View>
      }
    >
      {(workshop: Workshop) => (
        <CrossPlatformButtonLayout
          removeAllStyles
          onPress={() => handleCardPress(workshop)}
        >
          <WorkshopCard workshop={workshop} />
        </CrossPlatformButtonLayout>
      )}
    </TicDriveInfinitePaginationList>
  );
};

export default memo(WorkshopCards);
