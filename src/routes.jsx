import App from './App';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import CamperForm from './components/pages/CamperForm';
import CamperInfo from './components/pages/CamperInfo';

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
      {
        path: 'camper-form',
        element: <CamperForm />,
      },
      {
        path: 'camper-info/:postid',
        element: <CamperInfo />,
      },
    ],
  },
];

export default routes;
