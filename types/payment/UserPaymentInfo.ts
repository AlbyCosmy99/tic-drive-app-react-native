
export type PaymentType = 'Visa' | 'Mastercard' | 'Apple Pay' | 'Google Pay' | 'Cash'

export interface PaymentCard {
  cardHolder: string;
  cardNumber: string | null;
  paymentType: PaymentType;
  icon: React.ReactNode;
}

export default interface UserPaymentInfo {
  choosenCard: PaymentCard | null;
  defaultPaymentTypes: PaymentCard[];
  customPaymentTypes: PaymentCard[];
}