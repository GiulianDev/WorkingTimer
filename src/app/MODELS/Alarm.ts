/**
* Alarm time is saved as string HH:mm
* 
* To order the different alarms we save the HH:mm string as a number
* ex. 
*     12:00 => 1200 
*     04:00 => 400
*/

export interface Alarm {
    key: string;
    value: string;
    isPause: boolean;
    index: number;
    duration?: number;
}

export class Alarm implements Alarm {
        
    // Constructor
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
     * 
     * @returns Alarm hour
     */
    public get Hour(): string {
        let tmp = this.value.split(":");
        return tmp[0];
    };

    /**
     * 
     * @returns {string} Alarm minutes
     */
    public get Minutes(): string {
        let tmp = this.value.split(":");
        return tmp[1];
    }

    /**
     * Update value and index of the alarm
     * @param val 
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
        }
    }


    /**
    * Convert the time value from string to number, used as index
    * 
    * ex.
    * 
    *     12:00 => 1200 
    *     04:00 => 400
    * @param timeStr 
    * @returns 
    */
    private timeToIndex(timeStr: string) {
        timeStr = timeStr.replace(":", "");
        var timeNumber: number = + timeStr;
        return timeNumber;
    }

    
    
    //     // Properties
    //     key: string;
    //     value: string;
    //     isPause: boolean;
    //     index: number;
    //     duration?: number;
    

    
    
    
    
}