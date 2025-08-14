import EventCard from "./EventCard";
import { useCollection } from "../../../lib/hooks/useCollection";
import type { AppEvent } from "../../../lib/types";
import EventFilters from "./EventFilters";
import EmptyState from "../../../app/shared/EmptyState";
import { useEventFilters } from "../../../lib/hooks/useEventFilters";

export default function EventDashboard() {
  const { data: appEvents, loading } = useCollection<AppEvent>({ path: "events" });
  const { filter, setFilter, resetFilter } = useEventFilters();

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-2/3 ">
        <div className="flex flex-col gap-4">
          {!loading && appEvents?.length === 0 ? (
            <EmptyState message="No events for this filter" onReset={resetFilter} />
          ) : (
            <>
              {appEvents?.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="w-1/3 overflow-x-hidden sticky top-[96px] self-start">
        <EventFilters setFilter={setFilter} filter={filter} />
      </div>
    </div>
  );
}
