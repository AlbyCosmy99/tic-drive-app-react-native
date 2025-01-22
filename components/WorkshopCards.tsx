import WorkshopCard from './WorkshopCard';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {memo, useContext, useEffect} from 'react';
import GlobalContext from '@/stateManagement/contexts/global/GlobalContext';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import {WorkshopMini} from '@/types/workshops/Workshop';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';
import useJwtToken from '@/hooks/auth/useJwtToken';
import useAreServicesAvailable from '@/hooks/services/useAreServicesAvailable';
import useWorkshops from '@/hooks/api/workshops/useWorkshops';
import LoadingSpinner from './ui/loading/LoadingSpinner';

interface WorkshopCardsProps {
  tailwindContainerCss?: string;
}

const WorkshopCards: React.FC<WorkshopCardsProps> = ({
  tailwindContainerCss = '',
}) => {
  const {workshopFilter} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);

  const servicesChoosen = useServicesChoosenByUsers();
  const {areServicesAvailable} = useAreServicesAvailable();
  const {workshops, loadingWorkshops} = useWorkshops();

  useEffect(() => {
    console.log(areServicesAvailable);
  }, []);

  const token = useJwtToken();
  const handleCardPress = (workshop: WorkshopMini) => {
    navigationPush(navigation, 'WorkshopDetails', {id: workshop.id});
  };

  //checking if servicesChoosen are in the services offered by a workshop
  const anyService = (services: string[]) => {
    for (let serviceChoosen of servicesChoosen) {
      if (services.includes(serviceChoosen.title?.toLowerCase())) return true;
    }
    return false;
  };

  return loadingWorkshops ? (
    <LoadingSpinner />
  ) : (
    <ScrollView className={`${!token ? 'mb-2' : ''} ${tailwindContainerCss}`}>
      {workshops
        .filter(
          workshop =>
            // (!areServicesAvailable || (areServicesAvailable && anyService(workshop.services))) &&
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
        })}
    </ScrollView>
  );
};

export default memo(WorkshopCards);
