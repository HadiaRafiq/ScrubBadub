export enum ROLES {
  SCRUB = 'Scrub',
  BUD = 'Bud',
  DUBER = 'Duber',
}

export interface User {
  profileImage: string;
  isApproved: null;
  approvedAt: null;
  approvedById: null;
  isOnboard: boolean;
  id: string;
  createdAt: string;
  isActive: boolean;
  role: ROLES;
  fullname: string;
  email: string;
  phone: string;
  stripeCustomerId: null;
  stripeConnectedAccountId: null;
  addresses: Address[];
  stripeCustomer: null;
  stripeConnectedAccount: null;
  scrubVerificationDetails: null;
}

interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  longitude: number;
  latitude: number;
  createdAt: string;
}
