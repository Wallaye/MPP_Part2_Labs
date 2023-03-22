export const checkDate = (date1, date2) => {
    let time1 = Date.parse(date1);
    let time2 = Date.parse(date2);
    return time2 > time1;
}

export const getTime = (date1, date2) => {
    let time = -1;
    if (checkDate(date1, date2)){
        time = Date.parse(date2) - Date.parse(date1);
        return time;
    }
    return time;
}