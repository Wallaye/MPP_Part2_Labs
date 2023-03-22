export const getTimeToDate = (time1, time2) => {
    let diff = time2-time1;
    let date = new Date(diff);
    let year = date.getFullYear() - 1970;
    let month = date.getMonth();
    let day = date.getDate();
    let minutes = date.getMinutes();
    let minutesString = getString(minutes)
    let hours = date.getHours();
    let seconds = date.getSeconds();
    let hoursRes = year * 8760 + month * 730 + (day - 1) * 24 + hours - 3;
    let hoursString = getString(hoursRes)
    return `${hoursString}:${minutesString}:${seconds}`
}

export const toDate = (time) => {
    if (time === 0) return "Ещё не завершено"
    let date = new Date(time)
    return date.toLocaleString()
}

export const parseMsToDate = (_time) => {
    let time = new Date(_time);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let monthString = getString(month)
    let day = time.getDate();
    let dayString = getString(day)
    let minutes = time.getMinutes();
    let minutesString = getString(minutes)
    let hours = time.getHours();
    let hoursString = getString(hours)
    return `${year}-${monthString}-${dayString}T${hoursString}:${minutesString}`
}

function getString(str) {
    return str > 9 ? str : '0' + str;
}