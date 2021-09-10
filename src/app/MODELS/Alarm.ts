/**
* Alarm value is saved as string HH:mm
* 
* To order the different alarms we save the HH:mm string as a number
* ex. 
*     12:00 => 1200 
*     04:00 => 400
*/

import { IAlarm } from "./INTERFACES/IAlarm";

/**
 * Alarm is identified by an idex, a value and a key
 */
export class Alarm implements IAlarm {
        
    key: string = null;
    value: string = null;
    index: number = null;
    isPause: boolean = null;
    duration: number = null;

    constructor(
        key: string = null, 
        value: string = null, 
        isPause: boolean = null, 
        duration: number = null
    ) {
        this.key      = key,
        this.value    = value,
        this.index    = this.timeToIndex(value),
        this.isPause  = isPause,
        this.duration = duration
    }
    
    /**
     * Return the hour of the alarm as string
     * @returns {string} Alarm hour
     */
    public get Hour(): string {
        let tmp = this.value.split(":");
        return tmp[0];
    };

    /**
     * Return the minute of the alarm as string
     * @returns {string} Alarm minutes
     */
    public get Minutes(): string {
        let tmp = this.value.split(":");
        return tmp[1];
    }

    /**
     * Update value and index of the alarm
     * 
     * @param {sting | Alarm} val if value is passed, the index is Automatically update
     */
    public update(val: string | Alarm) {
        console.log('Updating alarm...');
        if (typeof(val) == 'string') {
            this.value = val;
            this.index = this.timeToIndex(val);
        } else {
            this.value = val.value;
            this.index = this.timeToIndex(val.value);
            if (val.duration) {
                this.duration = val.duration;
            }
            if (val.key) {
                this.key = val.key;
            }
            if (val.isPause) {
                this.isPause = val.isPause;
            }
        }
    }


    /**
    * Convert the time value from string to number, used as index
    * 
    * @example
    * Call by passing a time string in the format "HH:mm"
    *     timeToIndex(12:00) = 1200 
    *     timeToIndex(04:00) = 400
    * @param {string} timeStr Alarm timer string ("HH:mm")
    * @returns {number} Alarm index
    */
    private timeToIndex(timeStr: string): number {
        timeStr = timeStr.replace(":", "");
        var timeNumber: number = + timeStr;
        return timeNumber;
    }
    
}