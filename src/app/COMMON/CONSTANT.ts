import { PickerColumnOption } from "../MODELS/PickerOption";
import { Utility } from "./Utility";

export namespace CONSTANT {

    export const HOURS: string[] = Utility.GetTime(24, 2);
    export const HOUR_OPTS: PickerColumnOption[] = getHousOptions();

    export const MINUTES: string[] = Utility.GetTime(60, 2);
    export const MINUTES_OPTS: PickerColumnOption[] = getMinutesOptions();
    
    export const DAYS: string[] = [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
    ]


    function getHousOptions(){
        let options: PickerColumnOption[] = [];
        HOURS.forEach(x => {
            options.push({text:x, value:x});
        });
        return options;
    }

    function getMinutesOptions(){
        let options: PickerColumnOption[] = [];
        MINUTES.forEach(x => {
            options.push({text:x, value:x});
        });
        return options;
    }
}