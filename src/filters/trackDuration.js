export default function (duration) {
  const str = duration.toString()
  let min = str.slice(0, 3) / 60
  let sec = parseInt(str.slice(0, 3) % 60)
  let minString = parseInt(min.toString().slice('.')[0])
  let checkMin = minString < 10 ? `0${minString}` : minString
  let checkSec = sec < 10 ? `0${sec}` : sec
  return `${checkMin}:${checkSec}`
}
