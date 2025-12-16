export interface OrderAddress {
  label: string;
  address: string;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string;
  latitude: number;
  longitude: number;
}

export enum OrderStatus {
  REQUESTED = 'Requested',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  IN_PROGRESS = 'In_Progress',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

export interface OrderFilter {
  field: string;
  operator: string;
  value: string | number;
}

export interface ScrubOrdersRequest {
  filters?: OrderFilter[];
  fields?: string;
  logicalOperator?: 'and' | 'or';
  pageNumber?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
  sumFields?: string;
}

export interface OrderPrice {
  platformFee: number;
  taxes: number;
  loadPrice: number;
  delivery: number;
  pickup: number;
}

export interface OrderBud {
  id: string;
  fullname: string;
}

export interface OrderScrub {
  id: string;
  fullname: string;
  address?: OrderAddress;
}

export interface ScrubOrder {
  id: string;
  scrubEarning: number;
  loadSize: number;
  budLocation: string;
  budAddress: OrderAddress;
  orderInstructions: string | null;
  selfPickup: boolean;
  selfDelivery: boolean;
  budId: string;
  bud: OrderBud;
  scrubId: string;
  scrub: OrderScrub;
  status: OrderStatus;
  createdAt: string;
  totalRevenue: number;
  price: OrderPrice;
}

export interface ScrubOrdersResponse {
  data: {
    totalCount: number;
    items: ScrubOrder[];
  };
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  createdAt: string;
}

export interface OrderDetailResponse {
  id: string;
  loadSize: number;
  budAddressId: string;
  orderInstructions: string | null;
  createdAt: string;
  budId: string;
  scrubId: string;
  selfDelivery: boolean;
  selfPickup: boolean;
  statusHistory: OrderStatusHistory[];
  bud: OrderBudDetail;
  scrub: OrderScrubDetail;
  reviews: unknown[];
  price: OrderPrice;
  budAddress: OrderAddress;
  deliveries: OrderDelivery[];
}

export interface OrderBudDetail extends OrderBud {
  role: string;
  email: string;
  profileImage: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  isOnboard: boolean;
  isActive: boolean;
  isDeleted: boolean;
  isApproved: boolean | null;
  approvedAt: string | null;
  approvedById: string | null;
  stripeCustomerId: string | null;
  stripeConnectedAccountId: string | null;
  createdAt: string;
  address: OrderAddress | null;
}

export interface OrderScrubDetail extends OrderScrub {
  role: string;
  email: string;
  profileImage: string;
  gender: string;
  dateOfBirth: string;
  phone: string;
  isOnboard: boolean;
  isActive: boolean;
  isDeleted: boolean;
  isApproved: boolean | null;
  approvedAt: string | null;
  approvedById: string | null;
  stripeCustomerId: string | null;
  stripeConnectedAccountId: string | null;
  createdAt: string;
  addresses: OrderAddress[];
}

export interface OrderDelivery {
  id: string;
  price: number;
  distanceInMeters: number;
  createdAt: string;
  duberId: string | null;
  orderId: string;
  deliveryType: string;
  statusHistory: DeliveryStatusHistory[];
  duber: unknown | null;
}

export interface DeliveryStatusHistory {
  id: string;
  deliveryId: string;
  status: string;
  createdAt: string;
}
