/**
 * This method transforms a date into a human-readable format.
 * @param {Date | string} date - The date to be formatted
 * @param {Boolean} showTime - whether show hour:minutes or not. Default is true
 * @returns String
 */
export const transformDate = (date, showTime = true) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const time = `${hour}:${minutes}:00`;

  return `${year}-${month}-${day} ${showTime ? time : ''}`
};

/**
 * This method receives a date and calculates how many years of difference
 *  have passed until today
 * @param {Date | string} dob - The date to calculate years from.
 * @returns Number
 */
export const getAge = (dob) => {
  const ageDifMs = Date.now() - new Date(dob).getTime();
  const ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
