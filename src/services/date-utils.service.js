import { format, formatDistanceToNow, formatDistanceStrict } from 'date-fns'

export default {
  getFormattedDate,
  getFormattedDateTime,
  getTimeAgo,
  getTimeFromNow,
}

function getFormattedDate(date) {
  if (!date) return null
  return format(date, 'MM/dd/yyyy')
}

function getFormattedDateTime(date) {
  if (!date) return null
  return format(date, 'MM/dd/yyyy HH:mm')
}

function getTimeAgo(date) {
  if (!date) return null
  return `${formatDistanceToNow(date)} ago`
}

function getTimeFromNow(date) {
  if (!date) return null
  return formatDistanceStrict(new Date(), date)
}
