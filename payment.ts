export type CurrencyString =
  | 'NGN'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'GHS'
  | 'KES'
  | 'ZAR'
  | 'ZMW'
  | 'TZS'
  | 'UGX'
  | 'RWF'
  | 'XAF'
  | 'XOF'
  | 'CDF'
  | 'XOF';
export type PaymentStatus = 'pending' | 'failed' | 'success';
export type PaymentType = 'deposit' | 'withdrawal';

export type PaymentQueryParams = {
  page?: string;
  type?: PaymentType;
  status?: PaymentStatus;
  date?: string;
};

export type PaymentInit = {
  ref: string;
  url: string;
  type: PaymentType;
};

export type Payment = {
  _id: string;
  userId: string;
  amount: number;
  currency: CurrencyString;
  status: PaymentStatus;
  type: PaymentType;
  reference: string;
  createdAt: string;
  updatedAt: string;
};
