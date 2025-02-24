import WorkshopCard from './WorkshopCard';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {memo, useContext, useEffect, useMemo, useState} from 'react';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import navigationPush from '@/services/navigation/push';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import useWorkshops from '@/hooks/api/workshops/useWorkshops';
import LoadingSpinner from './ui/loading/LoadingSpinner';
import {View} from 'react-native';
import TicDriveButton from './ui/buttons/TicDriveButton';
import navigationReset from '@/services/navigation/reset';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {useFocusEffect} from 'expo-router';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import Workshop from '@/types/workshops/Workshop';
import {FlatList} from 'react-native-gesture-handler';
import useTicDriveNavigation from '@/hooks/navigation/useTicDriveNavigation';
import { useRoute } from '@react-navigation/native';

interface WorkshopCardsProps {
  tailwindContainerCss?: string;
  setAreNoWorkshop?: (areNoWorkshops: boolean) => void;
  favorite?: boolean
}

const WorkshopCards: React.FC<WorkshopCardsProps> = ({
  tailwindContainerCss = '',
  setAreNoWorkshop = () => {},
  favorite = false
}) => {
  const {workshopFilter, setWorkshopFilter} = useContext(GlobalContext);
  const navigation = useTicDriveNavigation()

  const servicesChoosen = useServicesChoosenByUsers();
  const {areServicesAvailable} = useAreServicesAvailable();
  const [currentPage, setCurrentPage] = useState(1);

  const workshopsPerPage = 10;
 
  const {workshops, loadingWorkshops, setLoadingWorkshops, count} =
    useWorkshops(
      currentPage - 1 * workshopsPerPage,
      workshopsPerPage,
      areServicesAvailable ? servicesChoosen[0]?.id : 0,
      true,
      favorite
    );
  const pages = count / workshopsPerPage;
  const token = useJwtToken();
  const dispatch = useAppDispatch();
  const handleChooseDifferentService = () => {
    dispatch(reset());
    navigationPush(navigation, 'ChooseServicesScreen');
  };

  const filteredWorkshops = useMemo(
    () =>
      workshops.filter(
        workshop =>
          workshopFilter.length === 0 ||
          workshop.name
            ?.toLowerCase()
            .trim()
            .includes(workshopFilter.toLowerCase().trim()),
      ),
    [workshops, workshopFilter],
  );

  useEffect(() => {
    setAreNoWorkshop(false);
    console.log('pages', pages);
  }, [filteredWorkshops]);

  useEffect(() => {
    return () => {
      setWorkshopFilter('');
    };
  }, []);

  useFocusEffect(() => {
    dispatch(setSelectedWorkshop(null));
  });

  const handleCardPress = (workshop: Workshop) => {
    //todo: controllare se il param workshop viene utilizzato davvero
    navigationPush(navigation, 'WorkshopDetails', {workshop});
  };

  return filteredWorkshops.length === 0 && !loadingWorkshops ? (
    <View className="flex-1 justify-center items-center mx-2.5">
      <Text className="text-lg text-gray-600 text-center">
        No workshop found. Try with a different service, or go to the dashboard.
      </Text>
      <TicDriveButton
        text="Look for a different service"
        onClick={handleChooseDifferentService}
      />
      <TicDriveButton
        text="Go back to dashboard"
        onClick={() => {
          navigationReset(navigation, 0, 'Hub', 'Home');
        }}
      />
    </View>
  ) : (
    <View className={`${!token ? 'mb-2' : ''} ${tailwindContainerCss}`}>
      {loadingWorkshops ? (
        <View className="w-full h-full justify-center items-center mt-40">
          <LoadingSpinner />
        </View>
      ) : (
        <FlatList
          data={filteredWorkshops}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleCardPress(item)}>
              <WorkshopCard workshop={item} />
            </TouchableOpacity>
          )}
          onEndReached={() => {
            if (currentPage < pages) {
              setCurrentPage(currentPage + 1);
              setLoadingWorkshops(true);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            loadingWorkshops && currentPage < pages ? (
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

export default memo(WorkshopCards);
