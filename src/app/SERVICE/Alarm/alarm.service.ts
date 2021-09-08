import { Injectable } from '@angular/core';
import { DEFAULT_VAL } from 'src/app/COMMON/DEFAULT_VAL';
import { KEYS } from 'src/app/COMMON/KEYS';
import { LABELS } from 'src/app/COMMON/LABELS';
import { Utility } from 'src/app/COMMON/Utility';
import { Alarm } from 'src/app/MODELS/Alarm';
import { Alarms } from 'src/app/MODELS/alarms';
import { StorageService } from '../Storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  
  private _alarms?: Alarms;
  
  constructor(private storageService: StorageService) { 
    this.GetStoredAlarms();
  }

  public get Alarms(): Alarms {
    return this._alarms;
  }

  public Reset() {
    this.GetStoredAlarms();
  }

  public ResetDefault() {
    this.SetDefaultAlarms();
  }

  public GetStoredAlarms() {
    this.storageService.getStoredData(KEYS.ALARMS)
    .then( res => {
      if (res == null) {
        this.SetDefaultAlarms(); 
      } else {
        this._alarms.clear();
        res.forEach(savedAlarm => {
          let alarm = new Alarm(savedAlarm.key, savedAlarm.value);
          this._alarms.push(alarm);
        });
      }
    })
  }

  // ToDo
  // miglirabole
  // /**
  // * Update Alarm by positional index
  // * @param val string
  // * @param idx number
  // */
  //  public updateAlaram(val: string, idx: number) {
  //   this.alarms[idx].update(val);
  // };








  /**
   * Set default alarm
   */
  private SetDefaultAlarms() {
    console.log('Loading default alarm values...');
    this._alarms.clear();
    // Default starting time
    const start: Alarm = new Alarm(LABELS.START, DEFAULT_VAL.START, false);
    this._alarms.push(start);
    // Default stopping time
    const end: Alarm = new Alarm(LABELS.STOP, DEFAULT_VAL.STOP, false);
    this._alarms.push(end);
    console.log('Default alarms: ', this._alarms);
    // Saving on storage
    this.Save();

  }
  
  public Save() {
    this.storageService.SaveData(this._alarms, KEYS.ALARMS);
  }


  public updateAlarm(value: string, idx: number = null) {
    if (idx != null) {
      this._alarms.update(value);
    }
    else {

    }
  }

  // ToDo
  // deve diventare una insert/add alarm

  /**
  * 
  * @param key Create a new Alarm
  * @param value 
  * @param isPause 
  * @param duration 
  * @returns 
  */
  public createAlarm (key: string = null, value: string = null, isPause: boolean = null, duration: number = null): Alarm {
    var alarm: Alarm = new Alarm(key, value, true); 
    return alarm;
  }
  
  

  
  
  
  
  
  
  // ToDo
  // trovare una soluzione differente per capire se siamo dentro a fuori il range degli allarmi
  // per poi gestre i messaggi

  // /**
  //  * 
  //  * Get the current hour and minutes as number (ex. 13:15 => 1315)
  //  */
  //  getCurrentTimeIndex() {
  //   let current = new Date();
  //   let hour = current.getHours()
  //   let min = current.getMinutes()
  //   let dateStr = Utility.zeroPrefix(hour, 2) + ":" + Utility.zeroPrefix(min, 2);
  //   let dateIdx = this.timeToIndex(dateStr);
  //   return dateIdx;
  // }
  
  
  
  
}
