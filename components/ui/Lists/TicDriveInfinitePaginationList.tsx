import useJwtToken from '@/hooks/auth/useJwtToken';
import {useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import LoadingSpinner from '../loading/LoadingSpinner';
import WorkshopCard from '@/components/WorkshopCard';
import Workshop from '@/types/workshops/Workshop';
import navigationPush from '@/services/navigation/push';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import CrossPlatformButtonLayout from '../buttons/CrossPlatformButtonLayout';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';

interface TicDriveInfinitePaginationListProps {
  loading: boolean;
  tailwindContainerCss?: string;
  filter?: string;
  setFilter?: (filter: string) => void;
  count: number;
  dataPerPage: number;
  setLoadingData: (loading: boolean) => void;
  data: any[];
  children?: (item: any) => React.ReactNode;
  noDataContent?: React.ReactNode;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const TicDriveInfinitePaginationList: React.FC<
  TicDriveInfinitePaginationListProps
> = ({
  loading = false,
  tailwindContainerCss = '',
  filter = '',
  setFilter,
  count,
  dataPerPage = 10,
  setLoadingData,
  data,
  children,
  noDataContent = <Text>No data found</Text>,
  currentPage,
  setCurrentPage,
}) => {
  const token = useJwtToken();
  const navigation = useTicDriveNavigation();
  const dispatch = useAppDispatch();

  const [accData, setAccData] = useState<Workshop[]>([]);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const pages = Math.ceil(count / dataPerPage);

  useEffect(() => {
    if (!loading) {
      if (currentPage === 1) {
        setAccData(data);
      } else {
        setAccData(prev => [...prev, ...data]);
      }
    }
  }, [data, loading, currentPage]);

  const filteredData = useMemo(
    () =>
      accData.filter(
        item =>
          filter.length === 0 ||
          item.name?.toLowerCase().trim().includes(filter.toLowerCase().trim()),
      ),
    [accData, filter],
  );

  const handleCardPress = (workshop: Workshop) => {
    dispatch(setSelectedWorkshop(workshop));
    navigationPush(navigation, 'WorkshopDetails');
  };

  useEffect(() => {
    return () => {
      if (setFilter) {
        setFilter('');
      }
    };
  }, [setFilter]);

  return filteredData.length === 0 && !loading ? (
    noDataContent
  ) : (
    <View className={`${!token ? 'mb-2' : ''} ${tailwindContainerCss}`}>
      {loading && currentPage === 1 ? (
        <View className="w-full h-full justify-center items-center">
          <LoadingSpinner />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CrossPlatformButtonLayout
              removeAllStyles
              onPress={() => handleCardPress(item)}
            >
              {children && children(item)}
            </CrossPlatformButtonLayout>
          )}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onEndReached={() => {
            if (
              !onEndReachedCalledDuringMomentum.current &&
              !loading &&
              currentPage < pages
            ) {
              onEndReachedCalledDuringMomentum.current = true;
              setCurrentPage(currentPage + 1);
              setLoadingData(true);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            loading && currentPage < pages ? (
              <ActivityIndicator
                size="large"
                color="green"
                style={{margin: 20}}
              />
            ) : null
          }
        />
      )}
    </View>
  );
};

export default TicDriveInfinitePaginationList;
