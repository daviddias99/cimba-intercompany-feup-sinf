const dateFormat = (date) => {
  const dt = new Date(date);
  const dateStr = ('0' + dt.getUTCDate()).slice(-2) + "/" + ('0' + (dt.getUTCMonth() + 1)).slice(-2) + "/" + dt.getUTCFullYear();
  return dateStr;
}

const dateTimeFormat = (date) => {
  const dt = new Date(date);
  const dateStr = ('0' + dt.getUTCDate()).slice(-2) + "/" + ('0' + (dt.getUTCMonth() + 1)).slice(-2) + "/" + dt.getUTCFullYear()
  + ' ' + ('0' + dt.getUTCHours()).slice(-2) + ':' +('0' + dt.getUTCMinutes()).slice(-2) + ":" + ('0' + dt.getUTCSeconds()).slice(-2);
  return dateStr;
}

module.exports = {dateFormat, dateTimeFormat};