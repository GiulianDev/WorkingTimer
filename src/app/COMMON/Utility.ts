import { Alarm } from "../MODELS/CLASSES/Alarm";

export namespace Utility {
    
    export function GetTime(maxVal: number = 99, digits: number = 2): string[] {
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
    
    /**
    * Add digit-1 zeros at the begin of the number
    * @param num 
    * @param digit number of zeros
    * @returns 
    */
    export function zeroPrefix(num, digit) {
        let zero = '';
        for(let i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
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
    export function timeToIndex(timeStr: string | Alarm): number {
    let tmpTime: string;
    if(typeof(timeStr) == "string") {
        tmpTime = timeStr.replace(":", "");
    } else {
        tmpTime = timeStr.value;
    }
    var timeNumber: number = + tmpTime;
    return timeNumber;
    }
    


    export function index2time(time: number): string {
        console.log("index to time");
        let timeStr: string = time.toString();
        let hh = "";
        let mm = "";
        if (timeStr.length == 4) {
            hh = this.zeroPrefix(timeStr.slice(0,2), 2);
            mm = this.zeroPrefix(timeStr.slice(2,4), 2);
        }
        if (timeStr.length == 3) {
            hh = this.zeroPrefix(timeStr.slice(0,1), 2);
            mm = this.zeroPrefix(timeStr.slice(1,3), 2);
        }
        if (timeStr.length == 2) {
            hh = "00";
            mm = this.zeroPrefix(timeStr, 2);
        }
        if (timeStr.length == 1) {
            hh = "00";
            mm = this.zeroPrefix(timeStr, 2);
        }
        return hh + ":" + mm;
    }
    
}






