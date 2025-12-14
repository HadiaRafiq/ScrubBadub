import { QueryClient } from '@tanstack/react-query';

import { showErrorToast } from '@/utils/toast';

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error: unknown) => {
        const message = (error as Error).message || 'Something went wrong';
        showErrorToast(message);
      },
    },
  },
});
