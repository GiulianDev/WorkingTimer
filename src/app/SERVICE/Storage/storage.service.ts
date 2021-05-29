import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { KEYS, SETTINGS, Settings } from 'src/app/MODELS/Interfaces';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private settings: Settings;

  constructor(private platform: Platform) {
    this.initializeSettings();
  }


  /**
   * Initialize the defailt setting
   * and Read Setting from local storage
   */
  async initializeSettings() {
    console.log("Initialising settings...");
    this.loadDefaultSettings();
    await this.platform.ready();
    // Fetch ALARMS
    const res = await Storage.get({key: SETTINGS.ALARMS});
    if (res.value != null) {
      this.settings.alarms = JSON.parse(res.value);
    }
    console.log(this.settings);
  }

  /**
   * Instantiate a new Settings class
   * with the default values
   */
  loadDefaultSettings() {
    this.settings = new Settings();
  }

  /**
   * @returns current settings
   */
  getSettings() {
    return this.settings;
  }

  /**
   * Save settings on the local storage
   * @param settings 
   */
  SaveSettings(settings: Settings) {
    let alarmsJSON = JSON.stringify(this.settings.alarms);
    console.log(alarmsJSON);
    Storage.set({
      key: SETTINGS.ALARMS,
      value: alarmsJSON
    });
  }

  /**
   * @returns Alarms array
   */
  getAlarms() {
    return this.settings.alarms;
  }

  /**
   * Get alarm by index
   * @param idx index of the alarm in the alarms array
   * @returns alarm at index posistion
   */

  getAlarm(idx: number) {
    return this.settings.alarms[idx];
  }

  /**
   * @returns the last alarm in the alarms array
   */
  getLastAlarm() {
    let end = this.settings.alarms.length - 1;
    return this.settings.alarms[end];
  }

}
