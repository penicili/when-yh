export type Event = {
    id: string;
    name: string;
    dates: string[];
    timezone: string;
    time_from: string;
    time_to: string;
    created_at: string;
}
export type CreateEventPayload = {
  name: string
  dates: Date[]
  timezone: string
  timeFrom: string
  timeTo: string
}