import moment from 'moment'

export const formatDate = (date) => {
  console.log(moment.locale())
  return moment(date).format('DD MMMM YYYY')
}
