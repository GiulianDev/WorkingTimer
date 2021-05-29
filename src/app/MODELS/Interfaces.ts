export enum LABELS {
    START  = "IN",
    STOP   = "OUT",
    PAUSE  = "PAUSE"
}

export enum DEFAULT_VAL {
    START  = "08:30",
    STOP   = "18:00",
}

export enum DateFormat {
    Year = "YYYY",
    YearMonth =	"YYYY-MM",
    HourMinute = "HH:mm",
    HourMinuteSeconds = "HH:mm:ss"
}

export enum KEYS {
    SETTINGS = "Setting",
}

export enum SETTINGS {
    ALARMS = "Alarms"
}

export class TimeList {
    constructor() {
        this.start = [];
        this.stop = [];
        this.diff = [];
        this.diffms = [];
        this.total = null;
        this.totalms = 0;
    };
    start?: Date[];
    stop?: Date[];
    diff?: string[];
    diffms?: number[];
    total?: string;
    totalms?: number;
}


export class Settings {
    constructor() {
        this.alarms = [
            {
                key: LABELS.START,
                value: DEFAULT_VAL.START,
                index: timeToString(DEFAULT_VAL.START),
                enabled: true
            },
            {
                key: LABELS.STOP,
                value: DEFAULT_VAL.STOP,
                index: timeToString(DEFAULT_VAL.STOP),
                enabled: true
            }
        ]
    };
    // attributes
    alarms?: Alarm[];
    // methods
    updateAlaram(val: string, idx: number) {
        this.alarms[idx].value = val;
        this.alarms[idx].index = timeToString(val);
    };

    /**
     * Add a nex alarm to the alarm array
     * @param alarmValue - string "hh:mm"
     * @returns Object {succeded: boolean, msg: string}
     */
    addAlarm(alarmValue: string) {
        // aggiungo l'elemento alla fine e poi riordino l'array
        // const idx = this.alarms.length;
        // create pause element
        const pause: Alarm = {
            key: LABELS.PAUSE,
            value: alarmValue,
            index: timeToString(alarmValue),
            enabled: false
        }
        console.log(pause);
        // ChecK if out of range
        if (pause.index < this.alarms[0].index || pause.index > this.alarms[this.alarms.length - 1].index) {
            return {succeded: false, msg:'PAUSE OUT OF RANGE!'};
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

    deleteAlarm(alarm: Alarm) {
        // var existingAlarm = this.alarms.filter(x => x.index == alarm.index);
        // var f = this.alarms.find(x => x.index == alarm.index);
   
        for (var idx = this.alarms.length - 1; idx >= 0; --idx) {
            if (this.alarms[idx].index == alarm.index) {
                this.alarms.splice(idx,1);
                return
            }
        }

        

    }
}

export class Alarm {
    key: string;
    value: string;
    enabled: boolean;
    index: number;
}

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


