import Vue from 'vue'
import DateUtilSvc from '@/services/date-utils.service'

Vue.filter('date', (data) => {
  return DateUtilSvc.getFormattedDate(data)
})

Vue.filter('dateTime', (data) => {
  return DateUtilSvc.getFormattedDateTime(data)
})

Vue.filter('timeAgo', (data) => {
  return DateUtilSvc.getTimeAgo(data)
})

Vue.filter('timeFromNow', (data) => {
  return DateUtilSvc.getTimeFromNow(data)
})
