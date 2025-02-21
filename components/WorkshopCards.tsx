import WorkshopCard from './WorkshopCard';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {memo, useContext, useEffect, useMemo, useState} from 'react';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import useWorkshops from '@/hooks/api/workshops/useWorkshops';
import LoadingSpinner from './ui/loading/LoadingSpinner';
import {Colors} from '@/constants/Colors';
import {View} from 'react-native';
import TicDriveButton from './ui/buttons/TicDriveButton';
import navigationReset from '@/services/navigation/reset';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import {useAppDispatch} from '@/stateManagement/redux/hooks';
import {useFocusEffect} from 'expo-router';
import {setSelectedWorkshop} from '@/stateManagement/redux/slices/workshopsSlice';
import Workshop from '@/types/workshops/Workshop';
import {FlatList} from 'react-native-gesture-handler';

interface WorkshopCardsProps {
  tailwindContainerCss?: string;
  setAreNoWorkshop?: (areNoWorkshops: boolean) => void;
}

const WorkshopCards: React.FC<WorkshopCardsProps> = ({
  tailwindContainerCss = '',
  setAreNoWorkshop = () => {},
}) => {
  const {workshopFilter, setWorkshopFilter} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);
  const [refreshing, setRefreshing] = useState(false);

  const servicesChoosen = useServicesChoosenByUsers();
  const {areServicesAvailable} = useAreServicesAvailable();
  const {workshops, loadingWorkshops, setLoadingWorkshops} = useWorkshops(
    0,
    10,
    areServicesAvailable ? servicesChoosen[0]?.id : 0,
  );

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
    navigationPush(navigation, 'WorkshopDetails', {workshop});
  };

  const onRefresh = () => {
    setRefreshing(true);
    setLoadingWorkshops(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
    <View
      className={`${!token ? 'mb-2' : ''} ${tailwindContainerCss}`}
      // refreshControl={
      //   <RefreshControl
      //     refreshing={refreshing}
      //     onRefresh={onRefresh}
      //     colors={[Colors.light.ticText]}
      //     tintColor={Colors.light.ticText}
      //   />
      // }
    >
      {loadingWorkshops ? (
        <View className="w-full h-full justify-center items-center mt-40">
          <LoadingSpinner />
        </View>
      ) : (
        // filteredWorkshops.map((workshop, index) => (
        //   <TouchableOpacity
        //     key={workshop.id || index}
        //     onPress={() => handleCardPress(workshop)}
        //   >
        //     <WorkshopCard workshop={workshop} />
        //   </TouchableOpacity>
        // ))
        <FlatList
          data={filteredWorkshops}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => handleCardPress(item)}>
              <WorkshopCard workshop={item} />
            </TouchableOpacity>
          )}
          //onEndReached={() => setLoadingWorkshops}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            loadingWorkshops ? (
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
