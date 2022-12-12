export const transformDate = (date, showTime = true) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    const time = `${hour}:${minutes}:00`;

    return `${year}-${month}-${day} ${showTime ? time : ''}`
};

export const getAge = (dob) => {
    const ageDifMs = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
