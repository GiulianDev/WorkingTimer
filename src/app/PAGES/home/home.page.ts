import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { SettingsPopoverComponent } from 'src/app/COMPONENTS/settingspopover/settings-popover/settings-popover.component';
import { StorageService } from 'src/app/SERVICE/Storage/storage.service';
import { TimerService } from 'src/app/SERVICE/Timer/timer.service';
import { TimeList, LABELS, DEFAULT_VAL } from '../../MODELS/Interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  private _startStopTxt: string = LABELS.START;
  private _isRunning: boolean = false;
  private time: string;
  private stopped: Date[] = [];
  private started: Date[] = [];
  private timeList: TimeList = new TimeList();
  // time offset between current time and alarm time
  private offset;

  private clickCounter: number = 0;

  /**
   * CONSTRUCTOR
   */
  constructor(
    private timerService: TimerService,
    private popoverController: PopoverController,
    private storageService: StorageService,
    public alertController: AlertController
  ) { 
    // ToDo
    // let User manage the offset
    this.offset = 15;
  }

  /**
   * Start/Stop timer function
   */
  async OnFabTimerClick() {
    
    // ToDo
    // check for alarm
    let alarm = this.storageService.getAlarm(this.clickCounter);
    let currentTime = this.timerService.getCurrentTimeIndex();

    
    
    let tt;
    if (alarm) {
      console.log("Alarm: ", alarm);
      console.log("Scheduled: ", alarm.index);
      console.log("Current: ", currentTime);

      if (currentTime < (alarm.index - this.offset))
      {
        tt = this.presentAlert("Not time yet");    
      }
      if (currentTime > (this.storageService.getLastAlarm().index)) {
        tt = this.presentAlert("Too late");    
      }

    }
    else 
    {
      this.StartStopTimer();
    }


    
  }


  StartStopTimer() {
    if (this._isRunning) 
    {
      this._startStopTxt = LABELS.START;
      this.timerService.stop();
    } 
    else 
    {
      this._startStopTxt = LABELS.STOP;
      this.timerService.start();
    }
    this.timeList = this.timerService.GetTimeList();
    this._isRunning = !this._isRunning;
    this.clickCounter++;
  }

  Reset() {
    this.timerService.reset();
    this.timeList = this.timerService.GetTimeList();
    console.log(this.timeList)
    this._isRunning = false;
    this.clickCounter = 0;
  }



  /**
   * Open Setings pop-up
   */
  async showSettings() {
    const popover = await this.popoverController.create({
      component: SettingsPopoverComponent,
      translucent: true
    });
    await popover.present();
    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



  /**
   * Show alert message
   */
  async presentAlert(msg: string) {
    const alert =  await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'WAIT',
      // subHeader: 'Subtitle',
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: this._startStopTxt + ' anyway',
          handler: (data: any) => {
            console.log('Selected Information', data);
            this.StartStopTimer();
          }
        }
      ]
    })
    await alert.present();
  }
  

}
