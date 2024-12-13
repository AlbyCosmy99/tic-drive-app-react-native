import WorkshopCard from './WorkshopCard';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import workshops from '../constants/temp/Workshops';
import {memo, useContext} from 'react';
import GlobalContext from '@/stateManagement/contexts/GlobalContext';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/NavigationContext';
import Workshop from '@/types/workshops/Workshop';
import {useServicesChoosenByUsers} from '@/hooks/user/useServiceChoosenByUsers';
function WorkshopCards() {
  const {workshopFilter} = useContext(GlobalContext);
  const {navigation} = useContext(NavigationContext);

  const servicesChoosen = useServicesChoosenByUsers();

  const isUserLogged = useAppSelector(state => state.auth.isAuthenticated);
  const handleCardPress = (workshop: Workshop) => {
    navigationPush(navigation, 'WorkshopDetails', {id: workshop.id});
  };

  //checking if servicesChoosen are in the services offered by a workshop
  const anyService = (services: string[]) => {
    console.log(services);
    for (let serviceChoosen of servicesChoosen) {
      if (services.includes(serviceChoosen.name.toLowerCase())) return true;
    }
    return false;
  };

  return (
    <ScrollView className={!isUserLogged ? 'mb-2' : ''}>
      {workshops
        .filter(
          workshop =>
            workshopFilter.length === 0 ||
            servicesChoosen.length === 0 ||
            (workshop.title
              .toLowerCase()
              .includes(workshopFilter.toLowerCase().trim()) &&
              anyService(workshop.services)),
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
}

export default memo(WorkshopCards);
