export interface ITimer {
    start?: Date[];
    stop?: Date[];
    diff?: string[];
    diffms?: number[];
    totalms?: number;

    running?: boolean;
    time?: string;
    timeBegan?: any;
    timeStopped?: any;
    stoppedDuration?: any;
    started?: any;
    blankTime?: string;
    stoppedList?: Date[];
    startedList?: Date[];
}