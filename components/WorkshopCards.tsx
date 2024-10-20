import WorkshopCard from './WorkshopCard';
import {ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import workshops, {Workshop} from '../constants/temp/Workshops';
import GlobalContext from '@/app/stateManagement/contexts/GlobalContext';
import {memo, useContext, useEffect} from 'react';
import {router} from 'expo-router';
import {useAppSelector} from '@/app/stateManagement/redux/hooks';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, Text, View } from 'react-native';
function WorkshopCards() {
  const {workshopFilter, servicesChoosen, setServicesChoosen} =
    useContext(GlobalContext);

  const isUserLogged = useAppSelector(state => state.auth.isAuthenticated);
  const width = Dimensions.get('window').width;
  const handleCardPress = (workshop: Workshop) => {
    router.push({
      pathname: '../../screens/WorkshopDetails',
      params: {id: workshop.id},
    });
  };

  //temp useEffect
  useEffect(() => {
    if (servicesChoosen.length === 0) {
      setServicesChoosen(['Service']);
    }
  }, []);

  //checking if servicesChoosen are in the services offered by a workshop
  const anyService = (services: string[]) => {
    for (let serviceChoosen of servicesChoosen) {
      if (services.includes(serviceChoosen.toLowerCase())) return true;
    }
    return false;
  };

  return (
    true ? (
      <Carousel
        loop
        width={width}
        data={workshops
          .filter(
            workshop =>
              (workshopFilter.length === 0 ||
                workshop.title
                  .toLowerCase()
                  .includes(workshopFilter.toLowerCase().trim())) &&
              anyService(workshop.services),
          )}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({item, index, animationValue}) => (
            <TouchableWithoutFeedback
              onPress={() => handleCardPress(item)}
            >
              <WorkshopCard workshop={item} />
            </TouchableWithoutFeedback>
        )}
    /> ) : (
      <ScrollView className={!isUserLogged ? 'mb-2' : ''}>
        {workshops
          .filter(
            workshop =>
              (workshopFilter.length === 0 ||
                workshop.title
                  .toLowerCase()
                  .includes(workshopFilter.toLowerCase().trim())) &&
              anyService(workshop.services),
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
    )
  );
}

export default memo(WorkshopCards);
