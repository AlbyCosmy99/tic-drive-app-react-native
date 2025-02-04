import {useEffect, useState} from 'react';
import apiClient from '@/services/http/axiosClient';
import Review from '@/types/workshops/Review';

const useReviews = (
  workshopId: number,
  skip: number = 0,
  take: number = 10,
) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiClient.get('reviews/' + workshopId);
        setReviews(res.data);
      } catch (err) {
        alert('Al momento il servizio non è disponibile. Riprova più tardi.');
        console.error(err);
      } finally {
        setLoadingReviews(false);
      }
    };

    if (loadingReviews) {
      fetchReviews();
    }
  }, [loadingReviews]);

  return {reviews, loadingReviews, setLoadingReviews};
};

export default useReviews;
