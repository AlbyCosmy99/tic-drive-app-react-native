import React, {useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import ServicesCard from './ServicesCard';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {UserCategory} from '@/types/User';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import useServices from '@/hooks/api/useServices';
import LoadingSpinner from './ui/loading/LoadingSpinner';
import {useAppSelector} from '@/stateManagement/redux/hooks';

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

  const selectedWorkshop = useAppSelector(
    state => state.workshops.selectedWorkshop,
  );
  const {services, loadingServices} = useServices(selectedWorkshop?.id);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        dispatch(reset());
      }
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loadingServices ? (
        <View className="w-full h-full justify-center items-center mt-40">
          <LoadingSpinner />
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
