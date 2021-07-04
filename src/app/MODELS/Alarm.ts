export class Alarm {
    // Constructor
    constructor(
        key: string = null, 
        value: string = null, 
        index: number = null, 
        enabled: boolean = null, 
        duration: number = null
    ) {
        this.key      = key,
        this.value    = value,
        this.index    = index,
        this.enabled  = enabled,
        this.duration = duration
    }

    // Properties
    key: string;
    value: string;
    enabled: boolean;
    index: number;
    duration?: number;

    /**
     * 
     * @returns Alarm hour
     */
    public getHour(): string {
        let tmp = this.value.split(":");
        return tmp[0];
    };

    /**
     * 
     * @returns {string} Alarm minutes
     */
    public getMinutes(): string {
        let tmp = this.value.split(":");
        return tmp[1];
    }
}