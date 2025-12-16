import { useQuery } from '@tanstack/react-query';

import { REACT_QUERY_KEYS } from '@/api/queryKeys';
import { getScrubOrders } from '@/services/orderService';
import { ScrubOrdersRequest } from '@/types/order';

export const useScrubOrders = (params?: ScrubOrdersRequest) => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.SCRUB_ORDERS, params],
    queryFn: () => getScrubOrders(params),
  });
};
