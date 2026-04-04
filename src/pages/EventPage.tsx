import { useParams } from "react-router-dom";
import { getEvent } from "../services/eventService";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import type {Event} from "../types/EventType";

export default function EventPage() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const eventData = await getEvent(id!);
        setEvent(eventData);
      } catch (error) {
        Swal.fire(
          "Error!",
          `There was an error fetching the event. ${error}`,
          "error",
        );
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchEvent();
    }
  }, [id]);

  if (!id) return <p>Event ID is required</p>;
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <p>Event ID: {id}</p>
      {event && (
        <div>
            <h2>{event.name}</h2>
        </div>
      )}
    </>
  );
}
