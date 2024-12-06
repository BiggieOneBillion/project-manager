import { useQueryClient } from "@tanstack/react-query";

export const useRevalidateQuery = (key: string) => {
    const queryClient = useQueryClient();

    // Returns a function that invalidates the query
    return () => queryClient.invalidateQueries({ queryKey: [key] });
};