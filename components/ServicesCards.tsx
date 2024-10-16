import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import ServicesCard from './ServicesCard';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import icons from '../constants/servicesIconsMap';
import {Colors} from '@/constants/Colors';
import {UserCategory} from '@/app/types/User';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {reset} from '@/app/stateManagement/redux/slices/servicesSlice';

interface Service {
  id: number;
  title: string;
  description: string;
}

interface ServicesCardsProps {
  isSingleChoice?: boolean;
  type: UserCategory;
}

const ServicesCards: React.FC<ServicesCardsProps> = ({
  isSingleChoice = true,
  type,
}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(
      'https://669ae4f09ba098ed610102d8.mockapi.io/api/v1/ticDrive/services',
    )
      .then(res => res.json())
      .then(res => {
        setServices(res);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      console.log(e);
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        dispatch(reset());
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors.light.bookingsOptionsText}
          />
        </View>
      ) : (
        services.map((elem, index) => (
          <View key={index} style={styles.cardContainer}>
            <ServicesCard
              id={elem.id}
              title={elem.title}
              description={elem.description}
              icon={icons[index + 1]}
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
    flex: 1,
  },
  cardContainer: {
    width: '50%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ServicesCards;
