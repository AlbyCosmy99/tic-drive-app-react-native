import React, {memo, useContext, useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import navigationPush from '@/services/navigation/push';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';
import TicDriveButton from './ui/buttons/TicDriveButton';
import navigationReset from '@/services/navigation/reset';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {useFocusEffect} from 'expo-router';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import TicDriveInfinitePaginationList from './ui/Lists/TicDriveInfinitePaginationList';
import {useState} from 'react';
import Workshop from '@/types/workshops/Workshop';
import WorkshopCard from './WorkshopCard';
import CrossPlatformButtonLayout from './ui/buttons/CrossPlatformButtonLayout';
import useJwtToken from '@/hooks/auth/useJwtToken';
import getAllWorkshops from '@/services/http/requests/get/workshops/getAllWorkshops';
import getFavoriteWorkshops from '@/services/http/requests/get/workshops/getFavoriteWorkshops';
import getNearbyWorkshops from '@/services/http/requests/get/workshops/getNearbyWorkshops';

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
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(false);
  const [count, setCount] = useState(0);

  const user = useAppSelector(state => state.auth.user);

  const commonOffset = useMemo(
    () => (currentPage - 1) * workshopsPerPage,
    [currentPage, workshopsPerPage],
  );

  const [debouncedFilter, setDebouncedFilter] = useState<string>(
    workshopFilter ?? '',
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(workshopFilter ?? '');
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [workshopFilter]);

  const dispatch = useAppDispatch();
  const token = useJwtToken();

  const fetchAllWorkshops = async () => {
    setLoadingWorkshops(true);
    const response = await getAllWorkshops(
      token ?? '',
      commonOffset,
      workshopsPerPage,
      debouncedFilter,
      0,
      {order, filter: workshopFilter},
    );
    setWorkshops(response.data.workshops);
    setCount(response.data.count);
    setLoadingWorkshops(false);
  };

  const fetchFavoriteWorkshops = async () => {
    setLoadingWorkshops(true);
    const response = await getFavoriteWorkshops(
      token ?? '',
      commonOffset,
      workshopsPerPage,
      debouncedFilter,
      {order, filter: workshopFilter},
    );
    setWorkshops(response.data.workshops);
    setCount(response.data.count);
    setLoadingWorkshops(false);
  };

  const fetchNearbyWorkshops = async () => {
    setLoadingWorkshops(true);
    const response = await getNearbyWorkshops(
      token ?? '',
      commonOffset,
      workshopsPerPage,
      debouncedFilter,
      {
        latitude: user?.coordinates?.latitude ?? 0,
        longitude: user?.coordinates?.longitude ?? 0,
      },
      0,
      {order, filter: workshopFilter},
    );
    if (response.data.count > 0) {
      setWorkshops(response.data.nearbyWorkshops);
      setCount(response.data.count);
      setLoadingWorkshops(false);
    } else {
      fetchAllWorkshops();
    }
  };

  useEffect(() => {
    if (favorite) {
      fetchFavoriteWorkshops();
    } else {
      fetchNearbyWorkshops();
    }
  }, [token, commonOffset, debouncedFilter, order]);

  useEffect(() => {
    setCurrentPage(1);
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
        <CrossPlatformButtonLayout onPress={() => handleCardPress(workshop)}>
          <WorkshopCard workshop={workshop} />
        </CrossPlatformButtonLayout>
      )}
    </TicDriveInfinitePaginationList>
  );
};

export default memo(WorkshopCards);
