import { Link } from "react-router";
import type { AppEvent } from "../../../lib/types";
import { useEvent } from "../../../lib/hooks/useEvent";
import clsx from "clsx";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { formatDateTime } from "../../../lib/util/util";
import Countdown from "../../../app/shared/components/Countdown";

export default function EventDetailedHeader({ event }: { event: AppEvent }) {
  const { host, isGoing, isHost, toggleAttendance, cancelToggle, shouldShowCountdown } = useEvent(event);

  return (
    <div className="card bg-base-100 image-full">
      <figure className="h-64">
        <img src={`/public/categoryImages/${event.category}.jpg`} alt="event category image" className="w-full object-cover brightness-50" />
        {event.isCancelled ? (
          <div className="alert alert-error absolute top-5 right-5">
            <XCircleIcon className="h-6 w-6" />
            <span>This event has been cancelled</span>
          </div>
        ) : (
          <>
            {shouldShowCountdown && (
              <div className="absolute top-5 right-5">
                <Countdown date={event.date} />
              </div>
            )}
          </>
        )}
      </figure>
      <div
        className="card-body text-white justifly-end absolute 
      bottom-0 w-full"
      >
        <div className="flex justify-between">
          <div>
            <h2 className="card-title text-4xl">{event.title}</h2>
            <p>{formatDateTime(event.date)}</p>
            <p>Hosted by {host?.displayName}</p>
          </div>
          <div className="flex flex-col justify-end ">
            <div className="flex gap-3 bottom-5 right-5 absolute">
              {isHost ? (
                <div className="flex gap-3">
                  <button
                    onClick={cancelToggle}
                    className={clsx("btn btn-error", {
                      "btn-success": event.isCancelled,
                      "btn-error": !event.isCancelled,
                    })}
                  >
                    {event.isCancelled ? "Reactivate event" : "Cancel Event"}
                  </button>
                  <Link to={`/manage/${event.id}`} className="btn btn-primary">
                    Manage Event
                  </Link>
                </div>
              ) : (
                <button
                  disabled={event.isCancelled}
                  onClick={toggleAttendance}
                  className={clsx("btn", {
                    "btn-primary": !isGoing,
                    "btn-error": isGoing,
                  })}
                >
                  {isGoing ? "Cancel Attendance" : "Join Event"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
