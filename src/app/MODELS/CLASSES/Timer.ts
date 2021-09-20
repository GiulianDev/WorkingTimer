import { ITimer } from "../INTERFACES/ITimer";

export class Timer implements ITimer {
    constructor() {
        
        this.running = false;
        this.time = "00:00.00";
        this.timeBegan = null;
        this.timeStopped = null;
        this.stoppedDuration = 0;
        this.started = null;
        this.blankTime = "00:00.00"
        this.stoppedList = [];
        this.startedList = [];
        
        this.start = [];
        this.stop = [];
        this.diff = [];
        this.diffms = [];
        this.totalms = 0;
    };

    public running: boolean;
    public time: string;
    public timeBegan: any;
    public timeStopped: any;
    public stoppedDuration: any;
    public started: any;
    public blankTime: string;
    public stoppedList: Date[];
    public startedList: Date[];

    start?: Date[];
    stop?: Date[];
    diff?: string[];
    diffms?: number[];
    totalms?: number;

}