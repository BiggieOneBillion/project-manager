
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Create a QueryClient instance
const queryClient = new QueryClient();

interface QueryProviderProps {
    children: React.ReactNode;
}

const QueryProvider: React.FC<QueryProviderProps> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/*<ReactQueryDevtools initialIsOpen={false} />*/}
        </QueryClientProvider>
    );
};

export default QueryProvider;