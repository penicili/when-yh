import { supabase } from '../../utils/supabase'
import type { Event, CreateEventPayload } from '../types/EventType'
import { DateTime } from 'luxon'

function toUTCEventData(dates: Date[], fromTz: string, timeFrom: string, timeTo: string) {
  // Ekstrak tanggal di timezone 
  const datesLocal = dates.map((d) =>
    DateTime.fromJSDate(d, { zone: fromTz }).toISODate()!,
  )

  // Pakai tanggal pertama sebagai referensi konversi waktu ke UTC
  // (menghindari date shifting karena time + date = datetime yang lengkap)
  const refDate = datesLocal[0]
  const timeFromUTC = DateTime.fromISO(`${refDate}T${timeFrom}`, { zone: fromTz }).toUTC()
  const timeToUTC = DateTime.fromISO(`${refDate}T${timeTo}`, { zone: fromTz }).toUTC()

  return {
    dates: datesLocal,
    timeFrom: timeFromUTC.toFormat('HH:mm'),
    timeTo: timeToUTC.toFormat('HH:mm'),
  }
}

export async function createEvent(payload: CreateEventPayload) {
  const { dates, timeFrom, timeTo } = toUTCEventData(
    payload.dates,
    payload.timezone,
    payload.timeFrom,
    payload.timeTo,
  )

  const { data, error } = await supabase
    .from('events')
    .insert({
      name: payload.name,
      dates,
      timezone: 'UTC',
      time_from: timeFrom,
      time_to: timeTo,
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
