interface Review {
  id: number;
  customerId: number;
  workshopId: number;
  text: string;
  whenPublished: Date;
  stars: number;
  customerImageUrl?: string;
  customerName: string;
}

export default Review;
