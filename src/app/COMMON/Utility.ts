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