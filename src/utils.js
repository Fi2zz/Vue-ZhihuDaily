const padding = (number) => number > 9 ? number : `0${number}`
function getDate(string) {
  let currDate = new Date();
  let year, month, date;
  if (!string) {
    year = currDate.getFullYear()
    month = currDate.getMonth()
    date = currDate.getDate()
  }
  year = Number(string.substring(0, 4));
  month = Number(string.substring(4, 6));
  date = Number(string.substring(6, 8));
  let appDate = new Date(year, month - 1, date);


  let week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',];
  return `${appDate.getFullYear()}年${padding(appDate.getMonth() + 1)}月${padding(appDate.getDate())}日 ${week[appDate.getDay()]}`;
}

export {
  getDate,
  padding
}
