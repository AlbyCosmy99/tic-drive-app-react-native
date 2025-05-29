import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import ServicesCard from './ServicesCard';
import TicDriveSpinner from './ui/spinners/TicDriveSpinner';

import getServices from '@/services/http/requests/get/services/getServices';
import serviceHasChildren from '@/services/http/requests/get/services/serviceHasChildren';

import {useAppSelector} from '@/stateManagement/redux/hooks';
import {setServiceTreeLevel} from '@/stateManagement/redux/slices/bookingSlice';
import useGlobalErrors from '@/hooks/errors/useGlobalErrors';

import Service from '@/types/Service';

const ServicesCards = ({fatherId}: {fatherId?: number}) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const languageCode = useAppSelector(state => state.language.languageCode);
  const selectedWorkshop = useAppSelector(state => state.booking.workshop);
  const serviceLevel = useAppSelector(state => state.booking.serviceTreeLevel);
  const {setErrorMessage} = useGlobalErrors();

  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        dispatch(setServiceTreeLevel(serviceLevel - 1));
      }
    });
    return unsubscribe;
  }, [navigation, dispatch, serviceLevel]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const data = await getServices(
          selectedWorkshop?.id,
          languageCode,
          fatherId,
          fatherId ? false : true,
        );
        console.log('services', data);
        setServices(data);
      } catch (e) {
        setErrorMessage('Errore durante il caricamento dei servizi.');
      } finally {
        setLoadingServices(false);
      }
    };

    if (loadingServices) {
      fetchServices();
    }
  }, [selectedWorkshop, languageCode, loadingServices, fatherId]);

  const handleServicePress = async (service: Service) => {
    try {
      const hasChildren = await serviceHasChildren(service.id);
      if (hasChildren) {
        navigation.push('ChooseServicesScreen', {
          fatherId: service.id,
        });
        dispatch(setServiceTreeLevel(serviceLevel + 1));
      } else {
      }
    } catch (e: any) {
      setErrorMessage(e.message || 'Errore nel controllo dei servizi figli');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loadingServices ? (
        <View className="w-full h-full justify-center items-center mt-40">
          <TicDriveSpinner />
        </View>
      ) : (
        services.map((elem, index) => (
          <View
            key={elem.id}
            style={styles.cardContainer}
            className={
              (services.length % 2 === 0 &&
                (index === services.length - 1 ||
                  index === services.length - 2)) ||
              (services.length % 2 !== 0 && index === services.length - 1)
                ? `mb-1`
                : ''
            }
          >
            <TouchableOpacity onPress={() => handleServicePress(elem)}>
              <ServicesCard
                id={elem.id}
                title={elem.title}
                description={elem.description}
                icon={elem.icon}
              />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 7,
  },
  cardContainer: {
    width: '50%',
  },
});

export default ServicesCards;
