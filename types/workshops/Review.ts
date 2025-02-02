interface Review {
  id: number;
  customerId: number;
  workshopId: number;
  text: string;
  whenPublished: Date;
  stars: number;
}

export default Review;
