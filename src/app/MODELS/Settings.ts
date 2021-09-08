import { LABELS } from "../COMMON/LABELS";
import { Alarm } from "./Alarm";

/**
 * Settings contains:
 * 1. List of alarms
 */
export class Settings {
    
    alarms?: Alarm[] = [];
    
    constructor() {
        
        // const start = new Alarm(LABELS.START, DEFAULT_VAL.START, false);
        // const end = new Alarm(LABELS.STOP, DEFAULT_VAL.STOP, false);

        // this.alarms.push(start);
        // this.alarms.push(end);
    };


    // /**
    //  * Update Alarm by positional index
    //  * @param val string
    //  * @param idx number
    //  */
    // updateAlaram(val: string, idx: number) {
    //     this.alarms[idx].value = val;
    //     this.alarms[idx].index = timeToString(val);
    // };

    /**
     * Add a nex alarm to the alarm array
     * @param alarmValue - string "hh:mm"
     * @returns Object {succeded: boolean, msg: string}
     */
    addAlarmn(alarmValue: string) {
        // aggiungo l'elemento alla fine e poi riordino l'array
        // const idx = this.alarms.length;
        // create pause element

        // const pause: Alarm = {
        //     key: LABELS.PAUSE,
        //     value: alarmValue,
        //     index: timeToString(alarmValue),
        //     enabled: false
        // }
        const pause: Alarm = new Alarm(LABELS.PAUSE, alarmValue, true);


        console.log(pause);
        // ChecK if out of range
        if (pause.index < this.alarms[0].index || pause.index > this.alarms[this.alarms.length - 1].index) {
            let msg = 'PAUSE OUT OF RANGE!';
            console.log(msg);
            return {succeded: false, msg: msg};
        }
        // check if there is an alarm with the same index
        //     => same starting time
        var existingAlarm = this.alarms.filter(x => x.index == pause.index);
        if (existingAlarm.length > 0) {
            return {succeded: false, msg:'A PAUSE at the same time ALREADY EXISTS!'};;
        }
        // push the new alarm
        this.alarms.push(pause);
        // reorder the alarm array
        this.alarms.sort((a, b) => {
            if (a.index && b.index) {
                if (a.index > b.index) return 1;
                if (a.index < b.index) return -1;
                return 0;
            }
            return 0;
        });
        return {succeded: true, msg:'Pause updated'};
    }
    
    /**
     * Delete a specific alarm from alarms array
     * @param alarm alarm to delete (type Alarm)
     * @returns Object {succeded: boolean, msg: string}
     */
    deleteAlarm(alarm: Alarm) {
        // var existingAlarm = this.alarms.filter(x => x.index == alarm.index);
        // var f = this.alarms.find(x => x.index == alarm.index);
        for (var idx = this.alarms.length - 1; idx >= 0; --idx) {
            if (this.alarms[idx].index == alarm.index) {
                this.alarms.splice(idx,1);
                return {succeded: true, msg:'Alarm deleted'};
            }
        }
        return {succeded: false, msg:'Alarm not deleted'};
    }
}