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
    
    
    
    
}


// export function getHoursOptions(alarm: Alarm = null){
//     console.log('Getting hours...');
//     let options = [];
//     HOURS.forEach(x => {
//         let obj = {text:x, value:x};
//         if (alarm != null) {
//             let h = alarm.getHour();
//         }
//         options.push(obj);
//     });
//     return options;
// }



