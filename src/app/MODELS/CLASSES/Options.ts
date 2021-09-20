import { IPickerColumnOption } from "../INTERFACES/IPickerOption";
import { Utility } from "../../COMMON/Utility";


export class Options {

    private _hours: string[];
    public HOURS_OPTIONS: IPickerColumnOption[];
    private _minutes: string[];
    public MINUTES_OPTS: IPickerColumnOption[];

    constructor() {

        console.log("jhkj");

        this._hours = Utility.GetTime(24, 2);
        this.HOURS_OPTIONS = this.getHousOptions();
        
        this._minutes = Utility.GetTime(60, 2);
        this.MINUTES_OPTS = this.getMinutesOptions();
        
        const DAYS: string[] = [
            "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
        ]
    
    }

    public  GetHourIdx(hour: string): number {
        for (let index = 0; index < this.HOURS.length; index++) {
            const element = this.HOURS[index];
            if(hour == element) {
                return index;
            }
        }
        return 0;
    }

    public  GetMinuteIdx(minute: string): number {
        for (let index = 0; index < this.MINUTES.length; index++) {
            const element = this.MINUTES[index];
            if(minute == element) {
                return index;
            }
        }
        return 0;
    }

    private get HOURS(): string[] {
        return this._hours;
    }

    // public get HOURS_OPTIONS(): IPickerColumnOption[] {
    //     return this._hourOptions;
    // }

    private get MINUTES(): string[] {
        return this._minutes;
    }

    // public get MINUTES_OPTS(): IPickerColumnOption[] {
    //     return this._minuteOptions;
    // }

    

    private getHousOptions(){
        let options: IPickerColumnOption[] = [];
        this.HOURS.forEach(x => {
            options.push({text:x, value:x});
        });
        return options;
    }

    private getMinutesOptions(){
        let options: IPickerColumnOption[] = [];
        this.MINUTES.forEach(x => {
            options.push({text:x, value:x});
        });
        return options;
    }
}