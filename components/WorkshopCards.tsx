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

interface WorkshopCardsProps {
  setAreNoWorkshop?: (areNoWorkshops: boolean) => void;
  favorite?: boolean;
}

const WorkshopCards: React.FC<WorkshopCardsProps> = ({
  setAreNoWorkshop = () => {},
  favorite = false,
}) => {
  const {workshopFilter, setWorkshopFilter} = useContext(GlobalContext);
  const navigation = useTicDriveNavigation();

  const servicesChoosen = useServicesChoosenByUsers();
  const {areServicesAvailable} = useAreServicesAvailable();
  const workshopsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const {workshops, loadingWorkshops, setLoadingWorkshops, count} =
    useWorkshops(
      (currentPage - 1) * workshopsPerPage,
      workshopsPerPage,
      areServicesAvailable ? servicesChoosen[0]?.id : 0,
      favorite,
    );
  const dispatch = useAppDispatch();

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
    >
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
    </TicDriveInfinitePaginationList>
  );
};

export default memo(WorkshopCards);
