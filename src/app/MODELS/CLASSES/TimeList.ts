import { ITimeList } from "../INTERFACES/ITimeList";

export class TimeList implements ITimeList {
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