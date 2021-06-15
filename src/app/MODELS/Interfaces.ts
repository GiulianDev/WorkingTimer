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

export class Alarm {
    key: string;
    value: string;
    enabled: boolean;
    index: number;
}

export interface Status {
    isRunning: boolean,
    timeList: TimeList
}




