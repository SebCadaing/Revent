import { createBrowserRouter } from 'react-router';
import App from '../layout/App';
import HomePage from '../../feature/home/HomePage';
import EventDashboard from '../../feature/events/dashboard/EventDashboard';
import EventDetails from '../../feature/events/details/EventDetails';
import EventForm from '../../feature/events/form/EventForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'events', element: <EventDashboard /> },
      { path: 'events/:id', element: <EventDetails /> }, //events/eventId
      { path: 'manage/:id', element: <EventForm /> },
      { path: 'createEvent', element: <EventForm /> },
    ],
  },
]);
