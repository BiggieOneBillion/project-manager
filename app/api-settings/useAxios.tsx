import { useUserDetailsStore, useUserDetailsType } from '@/lib/manager-store';
import axios from 'axios';
import { toast } from 'sonner';

const baseSettings = (token: string) => {
  const api = axios.create({
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  return api;
};

export const useAxios = () => {
  const token = useUserDetailsStore(
    (state: unknown) => (state as useUserDetailsType).token
  );

  if (!token) {
   toast.error('Token is missing. API requests may fail.');
  }

  const api = baseSettings(token);
  return api;
};
