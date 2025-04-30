import Star from '../../../assets/svg/star.svg';
import IconTextPair from '@/components/ui/IconTextPair';
import Workshop from '@/types/workshops/Workshop';
import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

interface WorkshopReviewinfoProps {
  meanStars?: Workshop['meanStars'];
  numberOfReviews?: Workshop['numberOfReviews'];
  containerTailwindCss?: string;
  textTailwindCss?: string;
}
const WorkshopReviewinfo: React.FC<WorkshopReviewinfoProps> = ({
  meanStars,
  numberOfReviews,
  containerTailwindCss,
  textTailwindCss,
}) => {
  const maxGrade = 5;
  const {t} = useTranslation();

  const text = useMemo(() => {
    if (numberOfReviews && numberOfReviews > 0) {
      const roundedMeanStars = meanStars ? meanStars.toFixed(1) : '0.0';
      return `${roundedMeanStars}/${maxGrade}.0 (${numberOfReviews} ${numberOfReviews !== 1 ? t('workshops.reviews.title') : t('workshops.reviews.review')})`;
    }
    return `${numberOfReviews} ${numberOfReviews !== 1 ? t('workshops.reviews.title') : t('workshops.reviews.review')}`;
  }, [numberOfReviews, meanStars]);

  return (
    (numberOfReviews || numberOfReviews === 0) && (
      <IconTextPair
        containerTailwindCss={`py-1.5 ${containerTailwindCss}`}
        textTailwindCss={`text-sm font-medium ${textTailwindCss}`}
        text={text}
        icon={<Star />}
      />
    )
  );
};

export default WorkshopReviewinfo;
