import { ReactElement } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import Favourites from "./views/Favourites";
import PhotoDetails from './views/PhotoDetails';
import GuestLayout from "./components/GuestLayout";
import Photos from './views/Photos';

interface CustomRouteObject {
	path: string,
    element: ReactElement;
	children?: CustomRouteObject[];
}

const routes: CustomRouteObject[] = [
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
			{
				path: "/",
				element: <Navigate to="/photos" />
			},
            {
                path: "/favourites",
                element: <Favourites />
            },
			{
				path: "/photos",
				element: <Photos />
			},
            {
                path: "/photos/:id",
                element: <PhotoDetails />
            }
        ]
    }, 
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
];

const Router = createBrowserRouter(routes);

export default Router;