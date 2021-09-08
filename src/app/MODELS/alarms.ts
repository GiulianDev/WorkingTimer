import { KEYS } from 'src/app/COMMON/KEYS';
import { LABELS } from 'src/app/COMMON/LABELS';
import { Utility } from 'src/app/COMMON/Utility';
import { Alarm } from 'src/app/MODELS/Alarm';


export class Alarms {
  
  private _alarms?: Alarm[] = [];
  
  constructor() { 
  }
  
  public get Alarms(): Alarm[] {
    return this._alarms;
  }
  
  public set Alarms(alarms: Alarm[]) {
    this._alarms = alarms;
  }
  
  /**
  * 
  * @param value 
  * @param idx if passed, the Alarm at selected index will be updated
  */
  public update(value: string | Alarm, idx: number = null) {
    if (idx != null) {
      if(idx > this._alarms.length) {
        console.log("Index out of range");
        return;
      }
      console.log("Alarms updated...");
      this._alarms[idx].update(value);
    }
    else {
      let currentIdx = this.timeToIndex(value);
      this._alarms.forEach(alarm => {
        if(currentIdx == alarm.index) {
          this._alarms[currentIdx].update(value);
          console.log("Alarms updated...");
          return;
        }
      });
      console.log("Index out of range");
    }
  }
  
  
  /**
  * Add a nex alarm to the alarm array
  * @param alarmValue - string "hh:mm"
  * @returns Object {succeded: boolean, msg: string}
  */
  public push(alarm: string | Alarm) {
    
    // create pause element
    let pause: Alarm;
    if (typeof(alarm) == "string") {
      pause = new Alarm(LABELS.PAUSE, alarm, true);
    } else {
      pause = alarm;
    }
    console.log(pause);
    
    if (this._alarms.length == 0) {
      this._alarms.push(pause);
      return {succeded: true, msg:'Pause updated'};
    }
    
    // ChecK if out of range
    if (pause.index < this._alarms[0].index || pause.index > this._alarms[this._alarms.length - 1].index) {
      let msg = 'PAUSE OUT OF RANGE!';
      console.log(msg);
      return {succeded: false, msg: msg};
    }
    // check if there is an alarm with the same index
    //     => same starting time
    var existingAlarm = this._alarms.filter(x => x.index == pause.index);
    if (existingAlarm.length > 0) {
      return {succeded: false, msg:'A PAUSE at the same time ALREADY EXISTS!'};;
    }
    
    // aggiungo l'elemento alla fine e poi riordino l'array
    this._alarms.push(pause);
    // reorder the alarm array
    this._alarms.sort((a, b) => {
      if (a.index && b.index) {
        if (a.index > b.index) return 1;
        if (a.index < b.index) return -1;
        return 0;
      }
      return 0;
    });
    return {succeded: true, msg:'Pause updated'};
  }
  
  
  public clear() {
    this._alarms = [];
  }
  
  
  /**
  * Convert the time value from string to number, used as index
  * 
  * ex.
  * 
  *     12:00 => 1200 
  *     04:00 => 400
  * @param timeStr 
  * @returns 
  */
  private timeToIndex(timeStr: string | Alarm): number {
    let tmpTime: string;
    if(typeof(timeStr) == "string") {
      tmpTime = timeStr.replace(":", "");
    } else {
      tmpTime = timeStr.value;
    }
    var timeNumber: number = + tmpTime;
    return timeNumber;
  }
  
}