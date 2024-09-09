import { DateTime } from 'luxon'

export default function useToIsoDate(date) {
  return DateTime.fromISO(date.toISOString()).toISODate()
}
