import { Component, OnInit } from '@angular/core';
import { AlertController, PickerController, PopoverController } from '@ionic/angular';
import { Alarm } from 'src/app/MODELS/Alarm';
import { StorageService } from 'src/app/SERVICE/Storage/storage.service';
import { PickerOptions } from "@ionic/core";
import { Settings } from 'src/app/MODELS/Settings';
import { AlertService } from 'src/app/SERVICE/Alert/alert.service';
import { getHoursOptions, getMinutesOptions, DAYS} from 'src/app/COMMON/Utility';

@Component({
  selector: 'app-settings-popover',
  templateUrl: './settings-popover.component.html',
  styleUrls: ['./settings-popover.component.scss'],
})
export class SettingsPopoverComponent implements OnInit {

  private customPickerOptions; 
  private settings: Settings;
  private days = DAYS;


  constructor(
    private popoverController: PopoverController,
    private storageService: StorageService,
    private pickerController: PickerController,
    public alertController: AlertController,
    public alert: AlertService
  ) {}

  ngOnInit() {
    console.log("Loading settings...")
    this.loadSettings();
    console.log(this.settings);
  }

  /**
   * Save new settings on the local storage
   */
  Save() {
    console.log("Saving settings...")
    this.storageService.SaveSettings(this.settings);
    this.DismissClick();
  }
  
  /**
   * Calcel the current temporary user settings and reload stored settings
   */
  async Cancel() {
    console.log("Cancel")
    this.settings = await this.storageService.getStoredSettings();
    this.DismissClick();
  }


  /**
   * Add a pause to the time array
   */
  AddPause(alarm: Alarm = null) {
    console.log("Selected alarm: ", alarm);
    this.showAlarmPicker(alarm);
  }

  /**
   * Delete pause
   * @param alarm 
   */
  DeletePause(alarm) {
    console.log(alarm);
    this.settings.deleteAlarm(alarm);
  }

  /**
   * Load User Settings
   */
  async loadSettings() {
    this.settings = this.storageService.getSettings();
  }

  /**
   * Update time values
   * @param val : string (HH:mm)
   * @param idx : index of the Alarms array to update
   */
   onTimeChange(val, idx) {
    // let copy = Object.assign({}, original );
    // this.tmpSettings.alarms = Object.assign([], this.settings.alarms); //{...this.settings};
    let time = val.detail.value;
    this.settings.updateAlaram(time, idx);
    console.log(this.settings.alarms);
  }


  /**
   * Dismiss settings pop-over
   */
  async DismissClick() {
    await this.popoverController.dismiss();
  }





  async showAlarmPicker(alarm: Alarm = null) {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            // console.log(value);
            var str: string = value.hours.value + ':' + value.minutes.value;
            let res = this.settings.addAlarm(str);

            if (res.succeded == false) {

            }
            this.showAlarmDurationPicker();
            // this.alert.presentWarningAlert(res.msg);
            
          }
        }
      ],
      columns:[
      {
        name:'hours',
        optionsWidth: '2rem',
        align: 'right',
        selectedIndex: alarm ? alarm.getMinutesIdex() : null,
        options: getHoursOptions(alarm)
      }, {
        name:'minutes',
        optionsWidth: '2rem',
        align: 'left',
        options: getMinutesOptions()
      }
    ],
    // cssClass: 'my-custom-picker',
    };
    let picker = await this.pickerController.create(options);
    picker.present()
  }



  async showAlarmDurationPicker(alarm: Alarm = null) {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value:any) => {
            // console.log(value);
            var str: string = value.hours.value + ':' + value.minutes.value;
            let res = this.settings.addAlarm(str);

            if (res.succeded == false) {

            }
            this.alert.presentWarningAlert(res.msg);
            
          }
        }
      ],
      columns:[
      {
        name:'minutes',
        prefix: 'Duration: ',
        options: getMinutesOptions()
      }
    ],
    // cssClass: 'my-custom-picker',
    };
    let picker = await this.pickerController.create(options);
    picker.present()
  }
}
