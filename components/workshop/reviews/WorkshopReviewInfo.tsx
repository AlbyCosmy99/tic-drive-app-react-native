import Star from '../../../assets/svg/star.svg';
import IconTextPair from "@/components/ui/IconTextPair";
import Workshop from '@/types/workshops/Workshop';
import { useMemo } from "react";

interface WorkshopReviewinfoProps {
    meanStars?: Workshop['meanStars'],
    numberOfReviews?: Workshop['numberOfReviews']
    containerTailwindCss?: string;
    textTailwindCss?: string;
}
const WorkshopReviewinfo: React.FC<WorkshopReviewinfoProps> = ({meanStars,numberOfReviews,containerTailwindCss,textTailwindCss }) => {
    const maxReview = 5

    const text = useMemo(() => {
        if(numberOfReviews && numberOfReviews > 0) {
            return `${meanStars}/${maxReview} (${numberOfReviews} ${numberOfReviews !== 1 ? 'reviews' : 'review'})`
        }
        return `${numberOfReviews} ${numberOfReviews !== 1 ? 'reviews' : 'review'}`
    }, [numberOfReviews, meanStars])
    
    return (
        (numberOfReviews || numberOfReviews === 0) && (
            <IconTextPair
                containerTailwindCss={`py-1.5 ${containerTailwindCss}`}
                textTailwindCss={`text-sm font-medium ${textTailwindCss}`}
                text={text}
                icon={<Star />}
            />
        )
    )
}

export default WorkshopReviewinfo