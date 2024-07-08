import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../styles/index.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider, RouteObject} from "react-router-dom";
import ErrorPage from "@/pages/Error.tsx";
import WatchPage from "@/pages/Watch.tsx";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage />,
    },
    {
        path: 'watch',
        element: <WatchPage />,
        errorElement: <ErrorPage />,
    }
]

const queryClient = new QueryClient()
const browserRouter = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={browserRouter}/>
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
