import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useUserDetailsStore, useUserDetailsType } from '@/lib/manager-store';

export const useProjectData = () => {
  const userDetails = useUserDetailsStore(
    (state: unknown) => (state as useUserDetailsType).userDetails
  );
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await axios.get(`/api/project/${userDetails.id}`);
      return response.data;
    }
  });

  return {
    data: data?.record,
    isLoading: isLoading,
    isError: isError
  };
};
