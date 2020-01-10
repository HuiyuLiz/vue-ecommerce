import moment from 'moment'
export default function (date) {
  return moment.unix(date).format('YYYY-MM-DDTHH:mm').replace('T', ' ');
}