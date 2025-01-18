import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import ServicesCard from './ServicesCard';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Colors} from '@/constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {UserCategory} from '@/types/User';
import {reset} from '@/stateManagement/redux/slices/servicesSlice';
import apiClient from '@/services/http/axiosClient';
import Service from '@/types/Service';

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
    const fetchServices = async () => {
      try {
        const res = await apiClient.get('services');
        setServices(res.data);
      } catch (err) {
        alert('Al momento il servizio non è disponibile. Riprova più tardi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        dispatch(reset());
      }
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  return loading ? (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator
        size="large"
        color={Colors.light.bookingsOptionsText}
      />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      {services.map((elem, index) => (
        <View key={elem.id} style={styles.cardContainer}>
          <ServicesCard
            id={elem.id}
            title={elem.title}
            description={elem.description}
            icon={elem.icon}
            type={type}
            isSingleChoice={isSingleChoice}
          />
        </View>
      ))}
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
