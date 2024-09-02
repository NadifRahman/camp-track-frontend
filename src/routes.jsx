import App from './App';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'sign-up',
        element: <Signup />,
      },
      {
        path: 'log-in',
        element: <Login />,
      },
    ],
  },
];

export default routes;
