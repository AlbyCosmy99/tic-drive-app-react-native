import Review from "@/constants/temp/Review";

interface Workshop {
    id: number;
    title: string;
    imageUrl: string;
    favourite: boolean;
    position: string;
    reviews: Review[];
    freeCancellation: boolean;
    price: string;
    discount: number;
    freeService: string;
    verified: boolean;
    services: string[];
    images: string[];
}

export default Workshop