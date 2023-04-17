export function DateToStringForInput(str: number | string){
    if (typeof str == "string"){
        if (str.length == 16){
             return str
        }
    }
    let time = new Date(+str);
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

function getString(str: number): string {
    return str > 9 ? str.toString() : '0' + str;
}

export const toDate = (time: string) => {
    if (time == null) return "Ещё не завершено"
    let date = new Date(time)
    return date.toLocaleString()
}

export const getTimeDiff = (_time1: string, _time2: string) => {
    if (_time2 == null){
        return "-";
    }
    let date2 = new Date(DateToStringForInput(_time2));
    let date1 = new Date(DateToStringForInput(_time1));
    let diff = date2.getTime() - date1.getTime()
    let date = new Date(diff);
    let year = date.getFullYear() - 1970;
    let month = date.getMonth();
    let day = date.getDate();
    let minutes = date.getMinutes();
    let minutesString = getString(minutes)
    let hours = date.getHours();
    let hoursRes = year * 8760 + month * 730 + (day - 1) * 24 + hours - 3;
    let hoursString = getString(hoursRes)
    return `${hoursString}:${minutesString}`
}