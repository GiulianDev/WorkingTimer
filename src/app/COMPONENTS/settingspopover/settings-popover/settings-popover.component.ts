import { Component, Input, OnInit } from '@angular/core';
import { AlertController, PickerController, PopoverController } from '@ionic/angular';
import { Alarm } from 'src/app/MODELS/CLASSES/Alarm';
import { StorageService } from 'src/app/SERVICE/Storage/storage.service';
import { PickerOptions } from "@ionic/core";
import { Settings } from 'src/app/MODELS/Settings';
import { AlertService } from 'src/app/SERVICE/Alert/alert.service';
import { AlarmService } from 'src/app/SERVICE/Alarm/alarm.service';
import { KEYS } from 'src/app/COMMON/KEYS';
import { Alarms } from 'src/app/MODELS/CLASSES/Alarms';
import { LABELS } from 'src/app/COMMON/LABELS';
import { IReturnMsg } from 'src/app/MODELS/INTERFACES/IReturnMsg';
import { Options } from 'src/app/MODELS/CLASSES/Options';

@Component({
  selector: 'app-settings-popover',
  templateUrl: './settings-popover.component.html',
  styleUrls: ['./settings-popover.component.scss'],
})
export class SettingsPopoverComponent implements OnInit {

  // private customPickerOptions; 
  // private settings: Settings;
  private _alarms: Alarms;
  private _alarmTmp: Alarm;
  private _selectedAlarmIdx: number;
  private PICKER_OPTIONS = new Options();
  // private alarmTmpValue: string;
  // private alarmTmpIndex: number;


  constructor(
    private popoverController: PopoverController,
    private storageService: StorageService,
    private alarmService: AlarmService,
    private pickerController: PickerController,
    public alertController: AlertController,
    public alert: AlertService
  ) {}

    


  ngOnInit(): void {
    console.log("Initializing setting...");
    this._alarms = new Alarms(this.alarmService.Alarms);
    console.log(this._alarms);
  }

  public get Alarms(): Alarm[] {
    return this._alarms.alarms;
  }




  //#region BUTTONS

  /**
   * Calcel the current temporary user settings and reload stored settings
   */
  public Cancel() {
    console.log("Cancel")
    this.DismissClick();
  }

  /**
   * Save new settings on the local storage
   */
  public Save() {
    console.log(this.Alarms);
    this.alarmService.Alarms = this._alarms.alarms;

    this.storageService.SaveAlarms(this.Alarms);
    this.DismissClick();
  }

  /**
   * Update an existing alarm
   * @param alarm 
   * @param idx 
   */
  UpdateAlarm(alarm: Alarm, idx: number) {
    this._selectedAlarmIdx = idx;
    this.showAlarmPicker(alarm);
  }


  /**
   * Add a pause to the time array
   */
  AddPause() {
    this._selectedAlarmIdx = null;
    this.showAlarmPicker();
  }

  /**
   * Delete pause
   * @param alarm 
   */
  DeletePause(alarm: Alarm) {
    let res = this._alarms.delete(alarm);
    console.log(res.msg);
  }

  //#endregion








  /**
   * Load User Settings
   */
  // async loadSettings() {
  //   // this.settings = this.storageService.getSettings();
  // }






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
          handler:(value: any) => {
            console.log("Selected value: ", value);
            let valueStr: string = value.hours.value + ':' + value.minutes.value;

            if (alarm) {
              // update
              this._alarmTmp = new Alarm(valueStr, alarm.key, alarm.isPause, alarm.duration);
            } else {
              // insert
              this._alarmTmp = new Alarm(valueStr, LABELS.PAUSE, true);
            }

            console.log("temporary alarm: ", this._alarmTmp);
            
            if (this._alarmTmp.isPause) {
              // open duration picker
              this.showAlarmDurationPicker(this._alarmTmp);
            } else {
              let response: IReturnMsg = this._alarms.update(this._alarmTmp, this._selectedAlarmIdx);
              if (response!.succeded == false) {
                console.log(response);
                this.alert.presentWarningAlert(response.msg);
              }
            }
          }
        }
      ],
      columns:[
      {
        name:'hours',
        optionsWidth: '2rem',
        align: 'right',
        selectedIndex: alarm ? this.PICKER_OPTIONS.GetHourIdx(alarm.hour) : null,
        options: this.PICKER_OPTIONS.HOURS_OPTIONS
      }
      , {
        name:'minutes',
        optionsWidth: '2rem',
        align: 'left',
        // ToDo
        // deve essere l'indice nell'array di minuti
        selectedIndex: alarm ? this.PICKER_OPTIONS.GetMinuteIdx(alarm.minutes) : null,
        options: this.PICKER_OPTIONS.MINUTES_OPTS
      }
    ],
    // cssClass: 'my-custom-picker',
    };
    let picker = await this.pickerController.create(options);
    picker.present()
  }



  async showAlarmDurationPicker(alarm: Alarm) {
    let options: PickerOptions = {
      buttons: [
        {
          text: "Cancel",
          role: 'cancel'
        },
        {
          text:'Ok',
          handler:(value: any) => {
            // add duration
            this._alarmTmp.duration = value?.hours?.value + ":" + value?.minutes?.value;
            console.log("temporary alarm: ", this._alarmTmp);
            let response: IReturnMsg;
            if (this._selectedAlarmIdx == null) {
              // add new pause
              response = this._alarms.add(this._alarmTmp);
            } else {
              // update existing one
              response = this._alarms.update(this._alarmTmp, this._selectedAlarmIdx);
            }
            // console.log(response.msg);
            if (response.succeded == false) {
              this.alert.presentWarningAlert(response.msg);
            }
          }
        }
      ],
      columns:[
        {
          name:'hours',
          optionsWidth: '2rem',
          align: 'right',
          selectedIndex: alarm ? this.PICKER_OPTIONS.GetHourIdx(alarm.hour) : null,
          options: this.PICKER_OPTIONS.HOURS_OPTIONS
        }
        , {
          name:'minutes',
          optionsWidth: '2rem',
          align: 'left',
          // ToDo
          // deve essere l'indice nell'array di minuti
          selectedIndex: alarm ? this.PICKER_OPTIONS.GetMinuteIdx(alarm.minutes) : null,
          options: this.PICKER_OPTIONS.MINUTES_OPTS
        }
    ],
    // cssClass: 'my-custom-picker',
    };
    let picker = await this.pickerController.create(options);
    picker.present()
  }
}
