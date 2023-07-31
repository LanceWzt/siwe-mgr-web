import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import router from './router';
import { GlobalStyle } from './style/layout_style';

const queryClient = new QueryClient({
    logger: {
        log: () => {
            return;
        },
        warn: () => {
            return;
        },
        error: () => {
            return;
        }
    },
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={queryClient}>
        <RecoilRoot>
            <RouterProvider router={router} />
            <GlobalStyle />
        </RecoilRoot>
        <ReactQueryDevtools />
    </QueryClientProvider>
);
