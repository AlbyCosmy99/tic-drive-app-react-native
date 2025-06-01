import useJwtToken from '@/hooks/auth/useJwtToken';
import {useEffect, useMemo, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import TicDriveSpinner from '../spinners/TicDriveSpinner';

interface TicDriveInfinitePaginationListProps<T = any> {
  loading: boolean;
  tailwindContainerCss?: string;
  filter?: string;
  setFilter?: (filter: string) => void;
  count: number;
  dataPerPage: number;
  setLoadingData: (loading: boolean) => void;
  data: T[];
  children?: (item: T) => React.ReactNode;
  noDataContent?: React.ReactNode;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const TicDriveInfinitePaginationList = <T,>({
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
}: TicDriveInfinitePaginationListProps<T>) => {
  const token = useJwtToken();
  const [accData, setAccData] = useState<T[]>([]);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const pages = Math.ceil(count / dataPerPage);

  // Reset accData on first page
  useEffect(() => {
    if (!loading) {
      if (currentPage === 1) {
        setAccData(data);
      } else {
        setAccData(prev => [...prev, ...data]);
      }
    }
  }, [data, loading, currentPage]);

  const filteredData = useMemo(() => {
    if (!filter.trim()) return accData;
    return accData.filter(item =>
      (item as any)?.name
        ?.toLowerCase?.()
        .includes(filter.toLowerCase().trim()),
    );
  }, [accData, filter]);

  useEffect(() => {
    return () => {
      if (setFilter) setFilter('');
    };
  }, [setFilter]);

  const showNoData =
    ((filter.length > 0 && filteredData.length === 0) ||
      (!loading && data.length === 0)) &&
    !loading;

  return showNoData ? (
    noDataContent
  ) : (
    <View className={`${!token ? 'mb-2' : ''} ${tailwindContainerCss}`}>
      {loading && currentPage === 1 ? (
        <View className="w-full h-full justify-center items-center">
          <TicDriveSpinner />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) =>
            (item as any)?.id?.toString() || index.toString()
          }
          renderItem={({item}) => <View>{children?.(item)}</View>}
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
          onEndReachedThreshold={0.4}
          ListFooterComponent={
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
