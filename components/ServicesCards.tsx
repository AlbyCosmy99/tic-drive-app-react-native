import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import ServicesCard from './ServicesCard';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {UserCategory} from '@/types/User';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import TicDriveSpinner from './ui/spinners/TicDriveSpinner';
import getServices from '@/services/http/requests/get/getServices';
import Service from '@/types/Service';

interface ServicesCardsProps {
  isSingleChoice?: boolean;
  type: UserCategory;
}

const ServicesCards: React.FC<ServicesCardsProps> = ({
  isSingleChoice = true,
  type,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const languageCode = useAppSelector(state => state.language.languageCode);

  const selectedWorkshop = useAppSelector(
    state => state.workshops.selectedWorkshop,
  );

  const servicesPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        dispatch(reset());
      }
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        const data = await getServices(selectedWorkshop?.id, languageCode);
        setServices(data);
      } catch (e) {
      } finally {
        setLoadingServices(false);
      }
    };

    if (loadingServices) {
      fetchServices();
    }
  }, [selectedWorkshop, languageCode, loadingServices]);

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
            <ServicesCard
              id={elem.id}
              title={elem.title}
              description={elem.description}
              icon={elem.icon}
              type={type}
              isSingleChoice={isSingleChoice}
            />
          </View>
        ))
      )}
    </ScrollView>

    // <TicDriveInfinitePaginationList
    // loading={loadingServices}
    // count={count}
    // setLoadingData={setLoadingServices}
    // dataPerPage={servicesPerPage}
    // data={services}
    // currentPage={currentPage}
    // setCurrentPage={setCurrentPage}
    // >
    //     <Text>services</Text>
    // </TicDriveInfinitePaginationList>
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
