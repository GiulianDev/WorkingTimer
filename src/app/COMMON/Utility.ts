import { Alarm } from "../MODELS/Alarm";


export const HOURS: string[] = GetTime(24, 2);
export const MINUTES: string[] = GetTime(60, 2);
export const DAYS: string[] = [
    "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
]

/**
* To order the different alarms we save the HH:mm string as a number
* ex. 
*     12:00 => 1200 
*     04:00 => 400
*/
export function timeToString(timeStr: string) {
    timeStr = timeStr.replace(":", "");
    var timeNumber: number = + timeStr;
    return timeNumber;
}

export function getHoursOptions(alarm: Alarm = null){
    console.log('Getting hours...');
    let options = [];
    HOURS.forEach(x => {
        let obj = {text:x, value:x};
        if (alarm != null) {
            let h = alarm.getHour();
        }
        options.push(obj);
    });
    return options;
}

export function getMinutesOptions(){
    let options = [];
    MINUTES.forEach(x => {
        options.push({text:x, value:x});
    });
    return options;
}

function GetTime(maxVal: number = 99, digits: number = 2): string[] {
    var list: string[] = [];
    var counter: number = 0;
    for(let idx = 0; idx < maxVal; idx++) {
        let tmp: string = counter.toString();
        // check for digits number
        let currentLength: number = tmp.length;
        if(currentLength < digits) {
            for(let idx = 0; idx < digits - currentLength; idx++) {
                tmp = "0" + tmp;
            }
        }
        list.push(tmp);
        counter++;
    }
    console.log(list);
    return list;
}