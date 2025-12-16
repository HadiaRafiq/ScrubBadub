import { useQuery } from '@tanstack/react-query';

import { REACT_QUERY_KEYS } from '@/api/queryKeys';
import { getScrubOrderDetail } from '@/services/orderService';

export const useScrubOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.SCRUB_ORDERS, orderId],
    queryFn: () => getScrubOrderDetail(orderId),
    enabled: !!orderId,
  });
};
