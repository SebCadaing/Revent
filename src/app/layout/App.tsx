import EventDashboard from '../../feature/events/dashboard/EventDashboard';
import Navbar from './nav/Navbar';

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-10 mt-24">
        <EventDashboard />
      </div>
    </div>
  );
}
