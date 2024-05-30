import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import useStore from './store/store';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import View from './pages/View/View';
import Error from './components/Error/Error';

const routes = [
  {
    path: "/",
    errorElement: <Error />,
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "view/:id",
        element: <View />,
      }
    ]
  },
  {
    path: "view/:id",
    element: <View />,
  }
];

const router = createBrowserRouter(routes);

function App() {
  const token = useStore((state: any) => state.token);
  localStorage.setItem('chakra-ui-color-mode', 'dark');

  useEffect(() => {
    if (token) {
      const match = window.location.pathname.match(/^\/dashboard\/view\/(.+)$/);
      if (match) {
        router.navigate(`/dashboard/view/${match[1]}`);
      } else {
        router.navigate('/dashboard');
      }
    } else {
      router.navigate('/');
    }
  }, [token]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
