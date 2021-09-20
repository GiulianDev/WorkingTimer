import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Settings } from 'src/app/MODELS/Settings';
import { Storage } from '@capacitor/storage';
import { KEYS } from 'src/app/COMMON/KEYS';
import { IStatus } from 'src/app/MODELS/INTERFACES/IStatus';
import { defer, Observable } from 'rxjs';
import { IAlarm } from 'src/app/MODELS/INTERFACES/IAlarm';
import { Alarms } from 'src/app/MODELS/CLASSES/Alarms';
import { Alarm } from 'src/app/MODELS/CLASSES/Alarm';
import { IReturnMsg } from 'src/app/MODELS/INTERFACES/IReturnMsg';
import { promise } from 'selenium-webdriver';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  // private settings: Settings;
  // private status: IStatus;
  
  constructor(private platform: Platform) {
    // this.initializeSettings();
    // this.initializeStatus();
  }
  
  
  

  //#region ______________GET_____________________

  public async getStoredAlarm() {
    return await this.getStoredData(KEYS.ALARMS);
  }

  /**
   * Return the stored status from the device local storage or null
   * @returns 
   */
  public async getStoredStatus(): Promise<IStatus> {
    let status = await this.getStoredData(KEYS.STATUS);
    if (status != null) {
      // converto tutte le date in oggetti di tipo Date
      status.timeList.start = this.convertStr2Date(status.timeList.start);
      status.timeList.stop = this.convertStr2Date(status.timeList.stop);
    }
    return status;
  }


  /**
   * Return the stored data from the device local storage
   * @param key 
   * @returns stored data from the device local storage
   */
   private async getStoredData(key: string): Promise<any> {
    console.log("Retrieving " + key + " from storage...");
    // Fetch data
    let data = null;
    const res = await Storage.get({key: key});
    if (res?.value != null) {
      data = JSON.parse(res.value);
    }
    console.log("Retrieved " + key + ": ", data)
    return data;
  }

  //#endregion
  

  //#region ______________SAVE____________________

  /**
   * Save status on the local storage
   * @param {Status} status
   */
  public SaveStatus(status: IStatus): Promise<IReturnMsg> {
    return this.SaveData(status, KEYS.STATUS);
  }


  /**
   * Save alarms array on the local storage
   * @param {Alarm[]} alarms
   */
   public SaveAlarms(alarms: Alarm[]) {
    this.SaveData(alarms, KEYS.ALARMS);
  }

  /**
  * Save settings on the local storage
  * @param {Settings} settings
  */
  private SaveData(data: any, key: string): Promise<IReturnMsg> {
    return new Promise((resolve, reject) => {
      console.log("Saving " + key + " to storage...");
      let JSONdata = JSON.stringify(data);
      console.log('Saved Data: ', JSONdata);
      let msg: IReturnMsg;
      return Storage.set({
        key: key,
        value: JSONdata
      })
      .then(res => {
        msg = {succeded: true, msg: key + "Saved"}
        resolve(msg);
      }, err => {
        msg = {succeded: false, msg: key + "NOT saved!"}
        reject(msg);
      });
    });
  }

  //#endregion
  

  //#region _____________UTILITY__________________
  
  convertStr2Date(dateStr: Array<any>) {
    console.log("Converting date time");
    let ln = dateStr.length;
    var convrtedDate: Date[] = [];
    for(let idx = 0; idx < ln; idx++) {
      convrtedDate[idx] = new Date(dateStr[idx]);
    }
    return convrtedDate;
  }
  
  //#endregion


  
  // /**
  // * Save settings on the local storage
  // * @param {Settings} settings
  // */
  // SaveSettings(settings: Settings) {
  //   console.log("Saving settings to storage...");
  //   let alarmsJSON = JSON.stringify(this.settings.alarms);
  //   console.log(alarmsJSON);
  //   Storage.set({
  //     key: KEYS.ALARMS,
  //     value: alarmsJSON
  //   });
  // }
  
  
  /**
  * Return the stored settings from the device local storage
  */
  // async getStoredSettings() {
  //   console.log("Retrieving settings from storage...");
  //   // Fetch ALARMS
  //   const res = await Storage.get({key: KEYS.ALARMS});
  //   if (res.value != null) {
  //     this.settings.alarms = JSON.parse(res.value);
  //     console.log("Settings: ", this.settings)
  //     return this.settings
  //   }
  //   return null;
  // }
  
  
  
  
  
  
  
  
  // /**
  // * @returns {Settings} current settings
  // */
  // getSettings() {
  //   return this.settings;
  // }
  
  // /**
  // * @returns {Status} current status
  // */
  // getStatus() {
  //   return this.status;
  // }
  
  // /**
  // * @returns Alarms array
  // */
  // getAlarms() {
  //   return this.settings.alarms;
  // }
  
  // /**
  // * Get alarm by index
  // * @param idx index of the alarm in the alarms array
  // * @returns alarm at index posistion
  // */
  // getAlarmByIndex(idx: number) {
  //   return this.settings.alarms[idx];
  // }
  

  
  // /**
  // * 
  // * @returns alarms number
  // */
  // getAlarmCount() {
  //   console.log(this.settings.alarms.length);
  //   return this.settings.alarms.length;
  // }

  /**
  * Read Setting from local storage or initialize the defailt setting
  */
  // async initializeSettings() {
  //   console.log("Initialising settings...");
  //   // this.loadDefaultSettings();
  //   await this.platform.ready();
  //   // Fetch ALARMS
  //   console.log("Retrieving settings from storage...");
  //   const alarms = await Storage.get({key: KEYS.ALARMS});
  //   if (alarms?.value != null) {
  //     // ToDo
  //     // sostituire con l'alarm service
  //     // this.settings.alarms = JSON.parse(alarms.value);
  //   } else {
  //     // this.SaveSettings(this.settings);
  //   }
  //   console.log("Settings: ", this.settings);
  // }
  
  
  // /**
  // * Read status from local storage
  // */
  // // async initializeStatus() {
  // //   this.status = await this.getStoredStatus();
  // // }
  
  // /**
  // * Instantiate a new Settings class with the default values
  // */
  // loadDefaultSettings() {
  //   this.settings = new Settings();
  // }
  

  
  

}
