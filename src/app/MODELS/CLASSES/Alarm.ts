import { IAlarm } from "../INTERFACES/IAlarm";

/**
 * Alarm is identified by an idex, a value and a key.
 * Alarm value is saved as string HH:mm
 * The index is automaticcaly generated from the alarm vale
 * To order the different alarms we save the HH:mm string as an index number
 * ex. 
 *     12:00 => 1200 
 *     04:00 => 400
 */
export class Alarm implements IAlarm {
        
    key: string = null;
    public _value: string = null;
    private _index: number = null;

    public isPause: boolean = null;
    public duration: string = null;
    
    constructor(
        value: string, 
        key: string = null, 
        isPause: boolean = null, 
        duration: string = null
    ) {
        this.key      = key,
        this.value    = value,
        this.isPause  = isPause,
        this.duration = duration
    }

    /**
     * When value is set, also index is automatically updated
     */
    set value(value: string) {
        this._value = value;
        this._index = this.timeToIndex(value);
    }

    get value() {
        return this._value;
    }

    get index() {
        return this._index;
    }
    
    /**
     * Return the hour of the alarm as string
     * @returns {string} Alarm hour
     */
    get hour(): string {
        let tmp = this._value.split(":");
        return tmp[0];
    };

    /**
     * Return the minute of the alarm as string
     * @returns {string} Alarm minutes
     */
    get minutes(): string {
        let tmp = this._value.split(":");
        return tmp[1];
    }


    /**
     * if duration > 0, return the next alarm index
     * that is the current value plus duration
     */
    get nextIndex(): number {
        if (this.duration != null ) {
            let duration = this.duration.split(":");
            let current_mm: number = +this.minutes;
            let current_hh: number = +this.hour;
            let next_mm: number = current_mm + +duration[1];
            let next_hh: number = current_hh + +duration[0];
            if (next_mm > 59) {
                if (next_mm == 60) {
                    next_mm = 0;
                } else {
                    let diff = next_mm - 60;
                    next_mm = diff;
                }
                next_hh += 1;
            }
            let nextIndexStr = this.zeroPrefix(next_hh.toString(), 2) + ":" + this.zeroPrefix(next_mm.toString(), 2);
            let nextIndex = this.timeToIndex(nextIndexStr);
            return nextIndex;
        }
        return null;
    }

    

    /**
     * Update alarm.
     * If value is passed, the index is automatically update,
     * If an alarm is passed, all the properties are update, and the new index is automatically update
     * 
     * @param {sting | Alarm} val you can pass either a value string or an Alarm object
     */
    public update(val: string | Alarm) {
        console.log('Updating alarm...');
        if (typeof(val) == 'string') {
            this.value = val;
        } else {
            this.value = val.value;
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

    /**
    * Add digit-1 zeros at the begin of the number
    * @param num 
    * @param digit number of zeros
    * @returns 
    */
    private zeroPrefix(num: string, digit: number): string {
        let zero = '';
        for(let i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }
    
}