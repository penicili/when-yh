export type UserAvailabilityPayload = {
    eventId: string;
    username: string;
    timezone: string;
    availability: {
        [date: string]: string[]; // array of time slots in "HH:mm" format
    };
}

export type UserAvailability = {
    availId: string;
    event_id: string;
    username: string;
    timezone: string;
    availability: string[];
    updated_at: string;
}