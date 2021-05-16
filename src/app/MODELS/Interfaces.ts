export enum LABELS {
    START  = "IN",
    STOP   = "OUT"
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


