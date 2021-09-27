export namespace MSG {

    export const ALARM_UPDATE: string = "Alarm updated";
    export const ALARM_UPDATE_ERROR: string = "An error occurred while updating alarm";
    export const ALARM_INVALID: string = "You cannot set this time value";

    export const PAUSE_UPDATE: string = "Pause updated";
    export const PAUSE_EXIST: string = "A PAUSE at the same time ALREADY EXISTS!";
    export const PAUSE_OUT_OF_RANGE: string = "Pause out of range!";
    export const PAUSE_IN_RANGE: string = "Pause follows in the range of another one!";
    
    export const INDEX_OUT_OF_RANGE: string = "Index out of range!";

    export const ENTER_EXCEED_PAUSE: string = "The enter cannot exceeds the pause";
    export const ENTER_EXCEED_OUT: string = "The enter cannot exceeds the out";

    export const OUT_EXCEED_PAUSE: string = "The out cannot precede the pause";
    export const OUT_EXCEED_ENTER: string = "The out cannot precede the enter";

    export const NOT_FOUND: string = "Alarm not found";

}