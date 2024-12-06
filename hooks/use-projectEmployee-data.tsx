import {useQuery} from "@tanstack/react-query";
import axios from "axios";


export const useProjectEmployeeData = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['projects-employee'],
        queryFn: async () => {
            const response  = await axios.get('/api/project-employee');
            return response.data;
        }
    })

   return {
        data: data?.record,
        isLoading: isLoading,
        isError: isError,
   }

}