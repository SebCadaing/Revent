import { useState } from 'react';
import EventDashboard from '../../feature/events/dashboard/EventDashboard';
import Navbar from './nav/Navbar';

export default function App() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div>
      <Navbar setFormOpen={setFormOpen} />
      <div className="container mx-auto px-10 mt-24">
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} />
      </div>
    </div>
  );
}
