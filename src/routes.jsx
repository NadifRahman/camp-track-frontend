import App from './App';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import CamperForm from './components/pages/CamperForm';
import CamperInfo from './components/pages/CamperInfo';
import CamperList from './components/pages/CamperList';
import InventoryForm from './components/pages/InventoryForm';
import InventoryPage from './components/pages/InventoryPage';
import InventoryList from './components/pages/InventoryList';
import AttendanceForm from './components/pages/AttendanceForm';
import AttendanceList from './components/pages/AttendanceList';
import AttendancePage from './components/pages/AttendancePage';

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
      { path: 'campers', element: <CamperList /> },
      {
        path: 'inventory-form',
        element: <InventoryForm />, // Add route for InventoryForm
      },
      {
        path: 'inventory-info/:postid',
        element: <InventoryPage />, // Add route for InventoryInfo
      },
      {
        path: 'inventory-list',
        element: <InventoryList />, // Add route for InventoryList
      },
      {
        path: 'attendance-form',
        element: <AttendanceForm />,
      },
      {
        path: 'attendance-list',
        element: <AttendanceList />,
      },
      { path: 'attendance/:postid', element: <AttendancePage /> },
    ],
  },
];

export default routes;
