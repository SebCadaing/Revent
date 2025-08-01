import type { Attendee } from '../../../lib/types';

type Props = {
  attendees: Attendee[];
};

export default function EventAttendees({ attendees }: Props) {
  return (
    <div className="avatar-group -space-x-5">
      {attendees.map((attendee) => (
        <div className="avatar" key={attendee.id}>
          <div className="w-12">
            <img
              src={attendee.photoURL || '/public/user.png'}
              alt="attendee-avatar"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
