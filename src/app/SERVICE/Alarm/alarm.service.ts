import { Injectable } from '@angular/core';
import { Utility } from 'src/app/COMMON/Utility';
import { Alarm } from 'src/app/MODELS/CLASSES/Alarm';
import { Alarms } from 'src/app/MODELS/CLASSES/Alarms';
import { IReturnMsg } from 'src/app/MODELS/INTERFACES/IReturnMsg';
import { NotificationService } from '../Notification/notification.service';
import { StorageService } from '../Storage/storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * L'alrm service deve fare da itermediario tra la classe Alarm e lo storage service
 */
export class AlarmService {
  
  private _alarms?: Alarms = new Alarms();

  // ToDo
  // let User manage the offset
  private offset: number = 5;

  /**
   * When the service is instantiated => Alarms are retrived from the storage
   * @param storageService 
   */
  constructor(
    private storageService: StorageService,
    private notificationService: NotificationService
    ) { 
    this.storageService.getStoredAlarm()
    .then(alarms => {
      if (alarms != null) {
        this.Alarms = alarms;
      }
      console.log("Alarms: ", this._alarms);
    });
  }

  //#region _________GET______________________________________
  public get Alarms(): Alarm[] {
    return this._alarms.alarms;
  }

  public get alarmsIdx(): number[] {
    return this._alarms.alarmsIdx;
  }

  get lastAlarm(): Alarm {
    return this.Alarms[this.Alarms.length - 1];
  }

  /** Get the current hour and minutes as number index (ex. 13:15 => 1315) */
  get currentTimeIndex() {
    let current = new Date();
    let hour = current.getHours()
    let min = current.getMinutes()
    let dateStr = Utility.zeroPrefix(hour, 2) + ":" + Utility.zeroPrefix(min, 2);
    let dateIdx = Utility.timeToIndex(dateStr);
    return dateIdx;
  }
  //#endregion

  //#region _________SET______________________________________
  public set Alarms(alarms: Alarm[]) {
    this._alarms.alarms = alarms;
  }
  //#endregion
  

  /**
   * Check if is too late or too early for the working day
   * @param index alarm position index in the alarms array
   * @returns 
   */
  public checkForAlarm(counter: number): IReturnMsg {
    let alarm = this.alarmsIdx[counter];
    let currentTime: number = this.currentTimeIndex;
    let msg = null;
    if (counter == this.alarmsIdx.length - 1) {
      msg = "This is the end!";
      let res = {succeded: false, msg: msg};
        return res;
    }
    if (alarm) {
      console.log("Scheduled alarm: ", alarm);
      console.log("Current index: ", currentTime);
      if (currentTime < (alarm - this.offset)) {
        msg =  "Not time yet!";
        let res = {succeded: true, msg: msg};
        return res;
      }
      // check if it is too late for today working day
      if (currentTime > (this.lastAlarm.index)) {
        msg = "You are out of your working hours!";
        let res = {succeded: true, msg: msg};
        return res;
      }
      msg = "Successfull";
      let res = {succeded: true, msg: msg};
      return res;

    } else {
      msg = "No alarms found!";
      let res = {succeded: true, msg: msg};
      return res;
    }
  }


  public pushNotification(counter: number) {
    console.log("pushing notification...");
    let alarmIdx = this.alarmsIdx[counter];
    let test = Utility.index2time(alarmIdx);
    this.notificationService.addNotification(test)
  }











  // public Reset() {
  //   this.GetStoredAlarms();
  // }

  // public ResetDefault() {
  //   this.SetDefaultAlarms();
  // }


  //#region PRIVATE METHOD
  
  // private GetStoredAlarms(): Promise<Alarm[]> {
  //   // return this.storageService.getStoredData(KEYS.ALARMS);
  // }

  // private Save() {
  //   this.storageService.SaveAlarms(this.Alarms);
  // }

  // private get DefaultAlarms(): Alarm[] {
  //   console.log('Loading default alarm values...');
  //   let alarmsTmp: Alarm[] = [];
  //   // this._alarms.clear();
  //   // Default starting time
  //   const start: Alarm = new Alarm(LABELS.START, DEFAULT_VAL.START, false);
  //   alarmsTmp.push(start);
  //   // Default stopping time
  //   const end: Alarm = new Alarm(LABELS.STOP, DEFAULT_VAL.STOP, false);
  //   alarmsTmp.push(end);
  //   console.log('Default alarms: ', this._alarms);
  //   // Saving on storage
  //   // this.Save();
  //   return alarmsTmp;
  // }

  //#endregion













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





  // public updateAlarm(value: string, idx: number = null) {
  //   // this._alarms.update(value);
  // }

  // ToDo
  // deve diventare una insert/add alarm

  // /**
  // * 
  // * @param key Create a new Alarm
  // * @param value 
  // * @param isPause 
  // * @param duration 
  // * @returns 
  // */
  // public createAlarm (key: string = null, value: string = null, isPause: boolean = null, duration: number = null): Alarm {
  //   var alarm: Alarm = new Alarm(key, value, true); 
  //   return alarm;
  // }
  
  
  
  // ToDo
  // trovare una soluzione differente per capire se siamo dentro a fuori il range degli allarmi
  // per poi gestre i messaggi


  
  
  
  
}
