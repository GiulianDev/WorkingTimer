import { NgModelGroup } from '@angular/forms';
import { DEFAULT_VAL } from 'src/app/COMMON/DEFAULT_VAL';
import { LABELS } from 'src/app/COMMON/LABELS';
import { MSG } from 'src/app/COMMON/MSG';
import { Utility } from 'src/app/COMMON/Utility';
import { Alarm } from 'src/app/MODELS/CLASSES/Alarm';
import { IReturnMsg } from '../INTERFACES/IReturnMsg';


export class Alarms {
  
  private _alarms?: Alarm[] = [];
  private _alarmsIdx?: number[] = [];
  
  constructor(alarms: Alarm[] = null) { 
    console.log("Alarm constructor");
    if (alarms != null) {
      alarms.forEach(alarm => {
        let alarmTmp = new Alarm(alarm.value, alarm.key, alarm.isPause, alarm.duration);
        this.push(alarmTmp);
      });
    } else {
      this.SetDefaultAlarms();
    }
  }
  
  public get alarms(): Alarm[] {
    return this._alarms;
  }

  public get alarmsIdx(): number[] {
    return this._alarmsIdx;
  }
  
  public set alarms(alarms: Alarm[]) {
    this._alarms = alarms;
    // create a new object because when retrieved from the storage all the Alarm methods are lost
    this.clear();
    alarms.forEach(alarm => {
      let alarmTmp = new Alarm(alarm._value, alarm.key, alarm.isPause, alarm.duration);
      this.push(alarmTmp);
    });
  }



  public add(alarm: string | Alarm): IReturnMsg {
    console.log("Adding alarms...");
    if (typeof(alarm) == "string") {
      alarm = new Alarm(alarm);
    } 
    let res = this.checkAlarm(alarm);
    console.log(res);
    if (res.succeded) {
      this.push(alarm);
      return {succeded: true, msg: MSG.ALARM_UPDATE};
    }
    return {succeded: false, msg: MSG.ALARM_INVALID};
  }

  /**
  * Update alarm by position if it is in axcepted range
  * @param value 
  * @param {number} idx alarm position in the Alarms array
  */
   public update(alarm: string | Alarm, position: number): IReturnMsg {
    console.log("Updating alarms...");
    if (typeof(alarm) == "string") {
      let value: string = alarm;
      alarm = new Alarm(this._alarms[position].value, this._alarms[position].key, this._alarms[position].isPause, this._alarms[position].duration);
      alarm.value = value;
    } 
    if (position == 0) {
      if (alarm.index > this.alarmsIdx[1]) {
        return {succeded: false, msg: MSG.ALARM_INVALID};
      } else {
        this._alarms[position] = alarm;
        this._alarmsIdx[position] = alarm.index;
        return {succeded: true, msg: MSG.ALARM_UPDATE};
      }
    }
    if (position == this._alarms.length - 1) {
      if (alarm.index < this.alarmsIdx[this._alarmsIdx.length - 1]) {
        return {succeded: false, msg: MSG.ALARM_INVALID};
      } else {
        this._alarms[position] = alarm;
        this._alarmsIdx[position] = alarm.index;
        return {succeded: true, msg: MSG.ALARM_UPDATE};
      }
    }    
    let alarmBackup = this._alarms[position];
    let res = this.delete(position);    
    res = this.checkAlarm(alarm);
    console.log(res);
    if (res.succeded) {
      this.push(alarm);
      return {succeded: true, msg: MSG.ALARM_UPDATE};
    } else {
      this.push(alarmBackup);
      return {succeded: false, msg: MSG.ALARM_INVALID};
    }
  }


  public clear() {
    this._alarms = [];
    this._alarmsIdx = [];
  }


  /**
   * Delete alarm by specifying:
   * @param alarm {number | Alarm} or the alarm object itself, or the position in the alarm array
   * @returns IReturnMsg {succeded: boolean, msg: string}
   */
  public delete(alarm: Alarm | number): IReturnMsg {
    console.log("Deleting pause...");
    if (typeof(alarm) == 'number') {
      let n = alarm == 0 ? 1 : alarm == this._alarms.length - 1 ? 1 : 2;
      this._alarms.splice(alarm, 1);
      let idx = (alarm * 2 - 1) > 0 ? alarm * 2 - 1 : 0;
      this._alarmsIdx.splice(idx, n);
      return {succeded: true, msg:'Alarm deleted'};
    } else {
      for (var idx = this._alarms.length - 1; idx >= 0; --idx) {
        if (this._alarms[idx].index == alarm.index) {
          let n = idx == 0 ? 1 : idx == this._alarms.length - 1 ? 1 : 2;
          this._alarms.splice(idx,1);
          let idx2 = (idx * 2 - 1) > 0 ? idx * 2 - 1 : 0;
          this._alarmsIdx.splice(idx2, n);
          return {succeded: true, msg:'Alarm deleted'};
        }
      }
    }
    return {succeded: false, msg:'Alarm not deleted'};
  }
  
  
  




  /**
   * Push the new alarm in the alarms list, and update the alarms index array
   * @param alarm 
   */
  private push(alarm: string | Alarm): IReturnMsg {
    console.log("pushing alarm...")
    // create pause element
    let alarmTmp: Alarm;
    if (typeof(alarm) == "string") {
      alarmTmp = new Alarm(alarm, LABELS.PAUSE, true);
    } else {
      alarmTmp = alarm;
    }  
    this._alarms.push(alarmTmp);
    this._alarmsIdx.push(alarmTmp.index);
    // check if alarm has a duration
    if (alarmTmp.duration != null) {
        this._alarmsIdx.push(alarmTmp.nextIndex);
        this.reorder();
        return {succeded: true, msg: "Alarm pushed"};
    }
  }


  /**
   * Check if the new alarm is overlapping an existing one or out of range
   * @param alarm 
   * @returns IReturnMsg {succeded: boolean, msg: string}
   */
  private checkAlarm(alarm: Alarm): IReturnMsg {
    let alarmIdx = -1;
    let nextAlarmIdx = -1;
    this._alarmsIdx.forEach( (currentAlarmIdx, idx) => {
      if (alarm.index > currentAlarmIdx) {
        alarmIdx = idx;
      }
      if (alarm?.nextIndex > currentAlarmIdx) {
        nextAlarmIdx = idx;
      }
    });
    if (alarmIdx != nextAlarmIdx) {
      return {succeded: false, msg: "Pause overlap!"}
    } else {
      if ((alarmIdx == -1 && nextAlarmIdx == -1) || (alarmIdx == this._alarmsIdx.length -1 && nextAlarmIdx == this._alarmsIdx.length  -1)) {
        return {succeded: false, msg: MSG.PAUSE_OUT_OF_RANGE}
      }
      return {succeded: true, msg: "Pause accepted!"}
    }
  }


  /** reorder the alarma array and the alarms index array */
  private reorder() {
    this._alarms.sort((a, b) => {
      if (a.index && b.index) {
        if (a.index > b.index) return 1;
        if (a.index < b.index) return -1;
        return 0;
      }
      return 0;
    });
    this._alarmsIdx.sort((a, b) => {
      if (a && b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      }
      return 0;
    });
  }


  /** If no alarms are stored, the default alarm values are set */
  private SetDefaultAlarms() {  
    console.log('Loading default alarms...');
    // Default start time
    const start: Alarm = new Alarm(DEFAULT_VAL.START, LABELS.START, false);
    this.push(start);
    // Default pause time
    const pause: Alarm = new Alarm(DEFAULT_VAL.PAUSE_BEGIN, LABELS.PAUSE, true, "01:00");
    this.push(pause);

    // // test pause time
    // const pause2: Alarm = new Alarm("10:00", LABELS.PAUSE, true, "00:15");
    // this.push(pause2);

    // Default stop time
    const end: Alarm = new Alarm(DEFAULT_VAL.STOP, LABELS.STOP, false);
    this.push(end);
    
    console.log('Default alarms: ', this._alarms);
    console.log('Default alarms index: ', this._alarmsIdx);
  }










  
    
    







  // /**
  //  * Add a new alarm to the alarm array and automatically reorder by index.
  //  * If an alarm at the same time already exist return error
  //  * @param {string} alarmValue "hh:mm"
  //  * @returns {Object} {succeded: boolean, msg: string}
  //  */
  // public push(alarm: string | Alarm): IReturnMsg {
  //   console.log("pushing alarm...")
  //   // create pause element
  //   let alarmTmp: Alarm;
  //   if (typeof(alarm) == "string") {
  //     alarmTmp = new Alarm(alarm, LABELS.PAUSE, true);
  //   } else {
  //     alarmTmp = alarm;
  //   }  
  
  //   if (this._alarms.length == 0) {
  //     this._alarms.push(alarmTmp);
  //     return {succeded: true, msg: MSG.PAUSE_UPDATE};
  //   }
  //   if (this._alarms.length == 1) {
  //     this._alarms.push(alarmTmp);
  //   }
  //   else {
  //     // ChecK if out of begin-end range
  //     if (alarmTmp.index < this._alarms[0].index || alarmTmp.index > this._alarms[this._alarms.length - 1].index) {
  //       return {succeded: false, msg: MSG.PAUSE_OUT_OF_RANGE};
  //     }
  //     // check if there is an alarm with the same index
  //     var existingAlarm = this._alarms.filter(x => x.index == alarmTmp.index);
  //     if (existingAlarm.length > 0) {
  //       return {succeded: false, msg: MSG.PAUSE_EXIST};
  //     }
  
  //     this._alarms.forEach( (alarm, idx) => {
  //       if (alarm.index == alarmTmp.index) {
  //         return {succeded: false, msg: MSG.PAUSE_EXIST};
  //       }
  //       // if it is a pause, check that it does not follow in the pause range
  //       if (alarm.isPause) {
  //         if (alarmTmp.index < alarm[idx+1]) {
  //           return {succeded: false, msg: MSG.PAUSE_IN_RANGE};
  //         }
  //       }
  //     });
  //     // aggiungo l'elemento alla fine e poi riordino l'array
  //     this._alarms.push(alarmTmp);
  //   }
  //   // reorder the alarm array
  //   this._alarms.sort((a, b) => {
  //     if (a.index && b.index) {
  //       if (a.index > b.index) return 1;
  //       if (a.index < b.index) return -1;
  //       return 0;
  //     }
  //     return 0;
  //   });
  //   return {succeded: true, msg: MSG.PAUSE_UPDATE};
  // }
  




  // /**
  //  * Return the position of the alarm in the alarms array, 
  //  * ordered by index
  //  * @param {string | Alarm} value 
  //  * @returns the position of the alarm in the alarms array or -1 if not found
  //  */
  //   private GetPosition(value: string | Alarm): number {
  //   let currentIdx = Utility.timeToIndex(value);
  //   this._alarms.forEach((alarm, position) => {
  //     if(currentIdx == alarm.index) {
  //       return position;
  //     }
  //   });
  //   return -1;
  // }
  
}