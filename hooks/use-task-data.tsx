import {useQuery} from "@tanstack/react-query";
import axios from "axios";


export const useTaskData = (projectId:string) => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const response  = await axios.get(`/api/task/${projectId}`);
            return response.data;
        }
    })

   return {
        data: data?.record,
        isLoading: isLoading,
        isError: isError,
   }

}