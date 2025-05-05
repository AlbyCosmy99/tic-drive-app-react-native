import SafeAreaViewLayout from '@/app/layouts/SafeAreaViewLayout';
import ClientReviewCard from '@/components/ClientReviewCard';
import TicDriveNavbar from '@/components/navigation/TicDriveNavbar';
import TicDriveInfinitePaginationList from '@/components/ui/Lists/TicDriveInfinitePaginationList';
import ReviewsProgressStars from '@/components/workshop/reviews/ReviewsProgressStars';
import WorkshopReviewinfo from '@/components/workshop/reviews/WorkshopReviewInfo';
import useReviews from '@/hooks/api/workshops/useReviews';
import {useAppSelector} from '@/stateManagement/redux/hooks';
import Review from '@/types/workshops/Review';
import {t} from 'i18next';
import {useEffect, useMemo, useState} from 'react';
import {Text, View} from 'react-native';

const WorkshopReviewsListScreen = () => {
  const selectedWorkshop = useAppSelector(
    state => state.workshops.selectedWorkshop,
  );
  const take = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const {reviews, loadingReviews, setLoadingReviews} = useReviews(
    selectedWorkshop?.id!,
    (currentPage - 1) * take,
    take,
  );

  const fiveStarsReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 5).length;
  }, [reviews]);

  const fourStarsReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 4).length;
  }, [reviews]);

  const threeStarsReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 3).length;
  }, [reviews]);

  const twoStarsReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 2).length;
  }, [reviews]);

  const oneStarReviews = useMemo(() => {
    return reviews.filter(review => review.stars === 1).length;
  }, [reviews]);

  return (
    <SafeAreaViewLayout>
      <TicDriveNavbar
        topContent={
          <Text className="text-lg font-semibold">{t('reviews')}</Text>
        }
        containerTailwindCss="h-10 items-end"
      />
      <View className="ml-5 mr-3">
        <View className="mb-2.5">
          <WorkshopReviewinfo
            meanStars={selectedWorkshop?.meanStars}
            numberOfReviews={selectedWorkshop?.numberOfReviews}
            containerTailwindCss="justify-center items-center"
            textTailwindCss="text-base font-medium"
          />
        </View>
        <ReviewsProgressStars reviews={fiveStarsReviews} stars={5} />
        <ReviewsProgressStars reviews={fourStarsReviews} stars={4} />
        <ReviewsProgressStars reviews={threeStarsReviews} stars={3} />
        <ReviewsProgressStars reviews={twoStarsReviews} stars={2} />
        <ReviewsProgressStars reviews={oneStarReviews} stars={1} />
      </View>
      <TicDriveInfinitePaginationList
        loading={loadingReviews}
        count={selectedWorkshop?.numberOfReviews!}
        setLoadingData={setLoadingReviews}
        dataPerPage={take}
        data={reviews}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        noDataContent={
          <View className="flex-1 justify-center items-center mx-2.5">
            <Text>This workshop has zero reviews.</Text>
          </View>
        }
      >
        {(review: Review) => <ClientReviewCard review={review} />}
      </TicDriveInfinitePaginationList>
    </SafeAreaViewLayout>
  );
};

export default WorkshopReviewsListScreen;
