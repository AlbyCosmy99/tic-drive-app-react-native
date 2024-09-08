import Review from "@/constants/temp/Review"

export const calculateDiscountPrice = (price: string, discount: number) => {
    const priceValue = parseInt(price.slice(1))
    return priceValue - priceValue*discount/100
}

export const calculateWorkshopStars = (reviews: Review[]) => {
    let sumReviewStars = 0
    reviews.forEach(review => {
        sumReviewStars += review.stars
    })
    return sumReviewStars/ reviews.length
}