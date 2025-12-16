import axiosInstance from '@/api/axiosInstance';
import { ENDPOINTS } from '@/api/endpoints';
import {
  OrderDetailResponse,
  ScrubOrdersRequest,
  ScrubOrdersResponse,
} from '@/types/order';

export const getScrubOrders = async (
  params?: ScrubOrdersRequest,
): Promise<ScrubOrdersResponse> => {
  const queryParams = new URLSearchParams();

  if (params?.filters) {
    queryParams.append('filters', JSON.stringify(params.filters));
  }

  if (params?.fields) {
    queryParams.append('fields', params.fields);
  }

  if (params?.logicalOperator) {
    queryParams.append('logicalOperator', params.logicalOperator);
  }

  if (params?.pageNumber !== undefined) {
    queryParams.append('pageNumber', params.pageNumber.toString());
  }

  if (params?.pageSize !== undefined) {
    queryParams.append('pageSize', params.pageSize.toString());
  }

  if (params?.sortField) {
    queryParams.append('sortField', params.sortField);
  }

  if (params?.sortDirection) {
    queryParams.append('sortDirection', params.sortDirection);
  }

  if (params?.sumFields) {
    queryParams.append('sumFields', params.sumFields);
  }

  const queryString = queryParams.toString();
  const url = queryString
    ? `${ENDPOINTS.SCRUB_ORDERS}?${queryString}`
    : ENDPOINTS.SCRUB_ORDERS;

  const response = await axiosInstance.get<ScrubOrdersResponse>(url);

  if (response.data?.data) {
    return response.data;
  }

  throw new Error('Failed to fetch scrub orders');
};

export const getScrubOrderDetail = async (
  id: string,
): Promise<OrderDetailResponse> => {
  const response = await axiosInstance.get<OrderDetailResponse>(
    ENDPOINTS.SCRUB_ORDER_DETAIL(id),
  );

  if (response.data) {
    return response.data;
  }

  throw new Error('Failed to fetch order details');
};
