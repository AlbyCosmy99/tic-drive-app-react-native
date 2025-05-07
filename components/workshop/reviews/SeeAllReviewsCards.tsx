import ClientReviewCard from '@/components/ClientReviewCard';
import CrossPlatformButtonLayout from '@/components/ui/buttons/CrossPlatformButtonLayout';
import TicDriveSpinner from '@/components/ui/spinners/TicDriveSpinner';
import useReviews from '@/hooks/api/workshops/useReviews';
import navigationPush from '@/services/navigation/push';
import NavigationContext from '@/stateManagement/contexts/nav/NavigationContext';
import {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Text, View, StyleSheet} from 'react-native';

const SeeAllReviewsCards = ({workshopId}: {workshopId: number}) => {
  const {reviews, loadingReviews} = useReviews(workshopId, 0, 10);
  const {navigation} = useContext(NavigationContext);
  const handleOnSeeAllReviews = () => {
    navigationPush(navigation, 'WorkshopReviewsListScreen');
  };
  const {t} = useTranslation();

  if (loadingReviews) return <TicDriveSpinner />;
  if (!reviews?.length) {
    return (
      <View>
        <Text className="text-base text-gray-500 mt-2">
          {t('reviewBooking.noReviewsYet')} 
        </Text>
      </View>
    );
  }

  return (
    <View>
      <ClientReviewCard review={reviews[0]} key={reviews[0].id} />
      {reviews.length > 1 && (
        <CrossPlatformButtonLayout
          containerTailwindCss="mt-4 border-grey-light"
          styleContainer={styles.button}
          onPress={handleOnSeeAllReviews}
        >
          <Text className="my-0.5 text-base font-medium">
            {t('seeAll.reviews')}
          </Text>
        </CrossPlatformButtonLayout>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderRadius: 12,
  },
});

export default SeeAllReviewsCards;
