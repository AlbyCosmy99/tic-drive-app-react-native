import React, {memo, useContext, useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useAppDispatch, useAppSelector} from '@/stateManagement/redux/hooks';
import {useFocusEffect} from 'expo-router';

import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import useJwtToken from '@/hooks/auth/useJwtToken';

import TicDriveInfinitePaginationList from './ui/Lists/TicDriveInfinitePaginationList';
import CrossPlatformButtonLayout from './ui/buttons/CrossPlatformButtonLayout';
import TicDriveButton from './ui/buttons/TicDriveButton';
import WorkshopCard from './WorkshopCard';

import navigationPush from '@/services/navigation/push';
import navigationReset from '@/services/navigation/reset';

import getAllWorkshops from '@/services/http/requests/get/workshops/getAllWorkshops';
import getFavoriteWorkshops from '@/services/http/requests/get/workshops/getFavoriteWorkshops';
import getNearbyWorkshops from '@/services/http/requests/get/workshops/getNearbyWorkshops';

import {
  setServices,
  setWorkshop,
} from '@/stateManagement/redux/slices/bookingSlice';

import Workshop from '@/types/workshops/Workshop';

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
  const {t} = useTranslation();

  const workshopsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [count, setCount] = useState(0);
  const [loadingWorkshops, setLoadingWorkshops] = useState(false);

  const token = useJwtToken();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const services = useAppSelector(state => state.booking.services);

  const commonOffset = useMemo(
    () => (currentPage - 1) * workshopsPerPage,
    [currentPage],
  );

  const [debouncedFilter, setDebouncedFilter] = useState(workshopFilter ?? '');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(workshopFilter ?? '');
    }, 500);
    return () => clearTimeout(handler);
  }, [workshopFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [workshopFilter, order]);

  useEffect(() => {
    setAreNoWorkshop(false);
  }, [workshopFilter]);

  useFocusEffect(() => {
    dispatch(setWorkshop(undefined));
  });

  const fetchAllWorkshops = async () => {
    setLoadingWorkshops(true);
    const res = await getAllWorkshops(
      token ?? '',
      commonOffset,
      workshopsPerPage,
      debouncedFilter,
      services[services.length - 1]?.id,
      {order, filter: workshopFilter},
    );
    setWorkshops(res.data.workshops);
    setCount(res.data.count);
    setLoadingWorkshops(false);
  };

  const fetchFavoriteWorkshops = async () => {
    setLoadingWorkshops(true);
    const res = await getFavoriteWorkshops(
      token ?? '',
      commonOffset,
      workshopsPerPage,
      debouncedFilter,
      {order, filter: workshopFilter},
    );
    setWorkshops(res.data.workshops);
    setCount(res.data.count);
    setLoadingWorkshops(false);
  };

  const fetchNearbyWorkshops = async () => {
    setLoadingWorkshops(true);
    const res = await getNearbyWorkshops(
      token ?? '',
      commonOffset,
      workshopsPerPage,
      debouncedFilter,
      {
        latitude: user?.coordinates?.latitude ?? 0,
        longitude: user?.coordinates?.longitude ?? 0,
      },
      services[services.length - 1]?.id,
      {order, filter: workshopFilter},
    );

    if (res.data.count > 0) {
      setWorkshops(res.data.nearbyWorkshops);
      setCount(res.data.count);
    } else {
      await fetchAllWorkshops(); // fallback
    }

    setLoadingWorkshops(false);
  };

  useEffect(() => {
    if (favorite) {
      fetchFavoriteWorkshops();
    } else {
      fetchNearbyWorkshops();
    }
  }, [token, commonOffset, debouncedFilter, order]);

  const handleChooseDifferentService = () => {
    dispatch(setServices([]));
    navigationPush(navigation, 'ChooseServicesScreen');
  };

  const handleCardPress = (workshop: Workshop) => {
    dispatch(setWorkshop(workshop));
    navigationPush(navigation, 'WorkshopDetailsScreen');
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
          <Text
            className="text-lg text-gray-600 text-center"
            allowFontScaling={false}
          >
            {t('workshops.notFound')}
          </Text>

          <TicDriveButton
            text={t('workshops.lookDifferentService')}
            onClick={handleChooseDifferentService}
          />
          <TicDriveButton
            text={t('workshops.goBackDashboard')}
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
