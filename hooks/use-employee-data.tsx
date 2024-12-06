import { useUserDetailsStore, useUserDetailsType } from "@/lib/manager-store";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";


export const useEmployeeData = () => {
    const userDetails = useUserDetailsStore(
        (state: unknown) => (state as useUserDetailsType).userDetails
      );
     const {data, isLoading, isError} = useQuery({
         queryKey:['employees'],
         queryFn: async () => {
             const response = await axios.get(`/api/employees/${userDetails.id}`);
             return response.data;
         }
     })

    return {data:data?.record, isLoading, isError}
 }