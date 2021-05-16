import moment from 'moment'

export function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

export function localTime (t) {
  const timezoneInMinutes = t/ 60;
  const currTime = moment().utcOffset(timezoneInMinutes).format("h:mm A");
  return currTime;
}
