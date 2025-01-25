import WorkshopCard from './WorkshopCard';
import {
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {memo, useContext, useState} from 'react';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import {WorkshopMini} from '@/types/workshops/Workshop';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import useWorkshops from '@/hooks/api/workshops/useWorkshops';
import LoadingSpinner from './ui/loading/LoadingSpinner';
import {Colors} from '@/constants/Colors';
import {View} from 'react-native';

interface WorkshopCardsProps {
  tailwindContainerCss?: string;
}

const WorkshopCards: React.FC<WorkshopCardsProps> = ({
  tailwindContainerCss = '',
}) => {
  const {workshopFilter} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);
  const [refreshing, setRefreshing] = useState(false);

  const servicesChoosen = useServicesChoosenByUsers();
  const {areServicesAvailable} = useAreServicesAvailable();
  const {workshops, loadingWorkshops, setLoadingWorkshops} = useWorkshops(
    0,
    10,
    areServicesAvailable ? servicesChoosen[0].id : 0,
  );

  const token = useJwtToken();
  const handleCardPress = (workshop: WorkshopMini) => {
    navigationPush(navigation, 'WorkshopDetails', {workshop});
  };

  const onRefresh = () => {
    setRefreshing(true);
    setLoadingWorkshops(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <ScrollView
      className={`${!token ? 'mb-2' : ''} ${tailwindContainerCss}`}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.light.ticText]}
          tintColor={Colors.light.ticText}
        />
      }
    >
      {loadingWorkshops ? (
        <View className="w-full h-full justify-center items-center mt-40">
          <LoadingSpinner />
        </View>
      ) : (
        workshops
          .filter(
            workshop =>
              workshopFilter.length === 0 ||
              workshop.name
                ?.toLowerCase()
                .trim()
                .includes(workshopFilter?.toLowerCase().trim()),
          )
          .map((workshop, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleCardPress(workshop)}
              >
                <WorkshopCard workshop={workshop} />
              </TouchableOpacity>
            );
          })
      )}
    </ScrollView>
  );
};

export default memo(WorkshopCards);
