import { supabase } from '../../utils/supabase'
import type { Event, CreateEventPayload } from '../types/EventType'


export async function createEvent(payload: CreateEventPayload) {  
  const { data, error } = await supabase
    .from('events')
    .insert({
      name: payload.name,
      dates: payload.dates.map((d) => d.toISOString()),
      timezone: payload.timezone,
      time_from: payload.timeFrom,
      time_to: payload.timeTo,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getEvent(id: string): Promise<Event> {
  const { data, error } = await supabase
    .from('events')
    .select()
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
