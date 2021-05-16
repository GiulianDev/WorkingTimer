import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { PopoverController } from '@ionic/angular';
import { Alarm, Settings, timeToString } from 'src/app/MODELS/Interfaces';
import { StorageService } from 'src/app/SERVICE/Storage/storage.service';

@Component({
  selector: 'app-settings-popover',
  templateUrl: './settings-popover.component.html',
  styleUrls: ['./settings-popover.component.scss'],
})
export class SettingsPopoverComponent implements OnInit {

  private customPickerOptions; 
  private settings: Settings;
  private tmpSettings: Settings;

  constructor(
    private popoverController: PopoverController,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    console.log("Loading settings...")
    this.loadSettings();
    console.log(this.settings)
  }

  /**
   * Save new settings on the local storage
   */
  Save() {
    console.log("Saving...")
    this.storageService.SaveSettings(this.settings);
    this.DismissClick();
  }
  
  Cancel() {
    console.log("Cancel")
    // this.settings = this.tmpSettings;
    this.DismissClick();
  }

  /**
   * Load User Settings
   */
  async loadSettings() {
    this.settings = this.storageService.getSettings();
    this.tmpSettings = Object.assign({}, this.settings);
  }

  /**
   * Update time values
   * @param val : string (HH:mm)
   * @param idx : index of the Alarms array to update
   */
   onTimeChange(val, idx) {
    // let copy = Object.assign({}, original );

    this.tmpSettings.alarms = Object.assign([], this.settings.alarms); //{...this.settings};
    let time = val.detail.value;
    this.settings.updateAlaram(time, idx);
    console.log(this.settings.alarms);
  }

  async DismissClick() {
    await this.popoverController.dismiss();
  }



}
