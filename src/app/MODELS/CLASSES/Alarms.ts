import { NgModelGroup } from '@angular/forms';
import { DEFAULT_VAL } from 'src/app/COMMON/DEFAULT_VAL';
import { LABELS } from 'src/app/COMMON/LABELS';
import { MSG } from 'src/app/COMMON/MSG';
import { Utility } from 'src/app/COMMON/Utility';
import { Alarm } from 'src/app/MODELS/CLASSES/Alarm';
import { IReturnMsg } from '../INTERFACES/IReturnMsg';


export class Alarms {
  
  private _alarms?: Alarm[] = [];
  private _alarmIdx: number[] = [];
  
  constructor(alarms: Alarm[] = null) { 
    console.log("Alarm constructor");
    if (alarms != null) {
      alarms.forEach(alarm => {
        let alarmTmp = new Alarm(alarm._value, alarm.key, alarm.isPause, alarm.duration);
        let idxTmp = alarm.index;
        this._alarmIdx.push(idxTmp);
        this._alarms.push(alarmTmp);
      });
    } else {
      this._alarms = this.DefaultAlarms;
    }
  }
  
  public get Alarms(): Alarm[] {
    return this._alarms;
  }
  
  public set Alarms(alarms: Alarm[]) {
    this._alarms = alarms;
    // create a new object because when retrieved from the storage
    // all the Alarm methods are lost,
    // or the array could not be ordered
    this._alarms = [];
    alarms.forEach(alarm => {
      let alarmTmp = new Alarm(alarm._value, alarm.key, alarm.isPause, alarm.duration);
      this._alarms.push(alarmTmp);
    });
  }

  public clear() {
    this._alarms = [];
  }
  

  /**
  * Update alarm,
  * * if no position is passed
  *   *  if the alarm andex is present in the alarms array, all the other property will be updated
  *   * otherwise return error
  * * if a position is passed
  *   * if the position and the alarm index are in the range, the alarm will be updated
  * @param value 
  * @param {number} idx alarm position in the Alarms array
  */
  public update(alarm: string | Alarm, position: number = null): IReturnMsg {
    console.log("Updating alarms...");
    if (typeof(alarm) == "string") {
      if (position == null) {
        return {succeded: false, msg: MSG.NOT_FOUND};
      }
      let value: string = alarm;
      alarm = new Alarm(this._alarms[position].value, this._alarms[position].key, this._alarms[position].isPause, this._alarms[position].duration);
      alarm.value = value;
    } 
    
    if (position == null) {
      position = this.GetPosition(alarm);
      if (position == -1) {
        return {succeded: false, msg: MSG.NOT_FOUND};
      } 
      // else {
      //   this._alarms[pos].update(alarm);
      //   return {succeded: true, msg: MSG.PAUSE_UPDATE};
      // }
    } 
    // else {
      // check if position is out of range
      if(position > this._alarms.length || position < 0) {
        return {succeded: false, msg: MSG.INDEX_OUT_OF_RANGE};
      }
      // check if the alarm index is out of range
      else if (position == 0) {
        if (alarm.index > this._alarms[1].index) {
          if (this._alarms.length == 2) {
            return {succeded: false, msg: MSG.ENTER_EXCEED_OUT};
          } else {
            return {succeded: false, msg: MSG.ENTER_EXCEED_PAUSE};
          }
        }
      } else if (position == this._alarms.length-1) {
        if (alarm.index < this._alarms[position-1].index + this._alarms[position-1]?.duration) {
          if (this._alarms.length == 2) {
            return {succeded: false, msg: MSG.OUT_EXCEED_ENTER};
          } else {
            return {succeded: false, msg: MSG.OUT_EXCEED_PAUSE};
          }
        }
      } else {
        if (alarm.index < this._alarms[0].index || alarm.index > this._alarms[this._alarms.length-1].index) {
            return {succeded: false, msg: MSG.PAUSE_OUT_OF_RANGE};
        }
      }
      this._alarms[position].update(alarm);
      return {succeded: true, msg: MSG.PAUSE_UPDATE};
    // }
  }
  
  
  /**
  * Add a new alarm to the alarm array and automatically reorder by index.
  * If an alarm at the same time already exist return error
  * @param {string} alarmValue "hh:mm"
  * @returns {Object} {succeded: boolean, msg: string}
  */
  public push(alarm: string | Alarm): IReturnMsg {
    console.log("pushing alarm...")
    // create pause element
    let alarmTmp: Alarm;
    if (typeof(alarm) == "string") {
      alarmTmp = new Alarm(alarm, LABELS.PAUSE, true);
    } else {
      alarmTmp = alarm;
    }    
    if (this._alarms.length == 0) {
      this._alarms.push(alarmTmp);
      this._alarmIdx.push(alarmTmp.index);
      return {succeded: true, msg: MSG.PAUSE_UPDATE};
    }
    if (this._alarms.length == 1) {
      this._alarms.push(alarmTmp);
      this._alarmIdx.push(alarmTmp.index);
    }
    else {
      // ChecK if out of begin-end range
      if (alarmTmp.index < this._alarms[0].index || alarmTmp.index > this._alarms[this._alarms.length - 1].index) {
        return {succeded: false, msg: MSG.PAUSE_OUT_OF_RANGE};
      }
      // check if there is an alarm with the same index
      var existingAlarm = this._alarms.filter(x => x.index == alarmTmp.index);
      if (existingAlarm.length > 0) {
        return {succeded: false, msg: MSG.PAUSE_EXIST};
      }

      this._alarms.forEach( (alarm, idx) => {
        if (alarm.index == alarmTmp.index) {
          return {succeded: false, msg: MSG.PAUSE_EXIST};
        }
        // if it is a pause, check that it does not follow in the pause range
        if (alarm.isPause) {
          if (alarmTmp.index < alarm[idx+1]) {
            return {succeded: false, msg: MSG.PAUSE_IN_RANGE};
          }
        }
      });



      // aggiungo l'elemento alla fine e poi riordino l'array
      this._alarms.push(alarmTmp);
      this._alarmIdx.push(alarmTmp.index);
    }
    // reorder the alarm array
    this._alarms.sort((a, b) => {
      if (a.index && b.index) {
        if (a.index > b.index) return 1;
        if (a.index < b.index) return -1;
        return 0;
      }
      return 0;
    });
    this._alarmIdx.sort((a, b) => {
      if (a && b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      }
      return 0;
    });
    return {succeded: true, msg: MSG.PAUSE_UPDATE};
  }

  
  /**
   * Delete a specific alarm from alarms array
   * @param alarm alarm to delete (type Alarm)
   * @returns Object {succeded: boolean, msg: string}
   */
  delete(alarm: Alarm): IReturnMsg {
    // var existingAlarm = this.alarms.filter(x => x.index == alarm.index);
    // var f = this.alarms.find(x => x.index == alarm.index);
    for (var idx = this._alarms.length - 1; idx >= 0; --idx) {
      if (this._alarms[idx].index == alarm.index) {
          this._alarms.splice(idx,1);
          return {succeded: true, msg:'Alarm deleted'};
      }
    }
    return {succeded: false, msg:'Alarm not deleted'};
  }

  /**
   * Return the position of the alarm in the alarms array, 
   * ordered by index
   * @param {string | Alarm} value 
   * @returns the position of the alarm in the alarms array or -1 if not found
   */
  private GetPosition(value: string | Alarm): number {
    let currentIdx = Utility.timeToIndex(value);
    this._alarms.forEach((alarm, position) => {
      if(currentIdx == alarm.index) {
        return position;
      }
    });
    return -1;
  }


  private get DefaultAlarms(): Alarm[] {
    console.log('Loading default alarm values...');
    let alarmsTmp: Alarm[] = [];
    // Default starting time
    const start: Alarm = new Alarm(DEFAULT_VAL.START, LABELS.START, false);
    alarmsTmp.push(start);
    // Default stopping time
    const end: Alarm = new Alarm(DEFAULT_VAL.STOP, LABELS.STOP, false);
    alarmsTmp.push(end);
    console.log('Default alarms: ', alarmsTmp);
    return alarmsTmp;
  }
  
}