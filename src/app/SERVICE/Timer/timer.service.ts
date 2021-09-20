import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { KEYS } from 'src/app/COMMON/KEYS';
import { Utility } from 'src/app/COMMON/Utility';
import { TimeList } from 'src/app/MODELS/CLASSES/TimeList';
import { Timer } from 'src/app/MODELS/CLASSES/Timer';
import { IStatus } from 'src/app/MODELS/INTERFACES/IStatus';
import { ITimer } from 'src/app/MODELS/INTERFACES/ITimer';
import { NotificationService } from '../Notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {


  private _timer: Timer = new Timer();

  // private running = false

  // public timeBegan = null
  // public timeStopped:any = null
  // public stoppedDuration:any = 0
  // public started = null
  // public blankTime = "00:00.00"
  // private _time: string = "00:00.00"
  // private _timeList: TimeList = new TimeList();
  // public stoppedList: Date[] = [];
  // public startedList: Date[] = [];

  constructor(
    public platform: Platform,
    public notificationService: NotificationService
  ) {
    console.log("Timer: ", this._timer);
  }


  //#region _______MEANGE TIMER FINCTIONS_____________________________

  /**
   * Start timer
   */
  start() {
    console.log("Start");
    if(this._timer.running) {
      return;
    }
    if (this._timer.timeBegan === null) {
        this.reset();
        this._timer.timeBegan = new Date();
    }
    if (this._timer.timeStopped !== null) {
      let newStoppedDuration:any = (+new Date() - this._timer.timeStopped)
      this._timer.stoppedDuration = this._timer.stoppedDuration + newStoppedDuration;
    }
    this.timeList.start.push(new Date());
    this._timer.started = setInterval(this.clockRunning.bind(this), 10);
    this._timer.running = true;
  }
  
  /**
   * Stop timer
   */
  stop() {
    this._timer.running = false;
    this._timer.timeStopped = new Date();
    this.timeList.stop.push(this._timer.timeStopped);
    this.calcDiff();
    clearInterval(this._timer.started);
  }
  
  /**
   * Reset timer
   */
  reset() {
      this._timer.running = false;
      clearInterval(this._timer.started);
      this._timer.stoppedDuration = 0;
      this._timer.timeBegan = null;
      this._timer.timeStopped = null;
      this._timer.time = this._timer.blankTime;
      this._timer = new Timer();
      // this.clickCounter = 0;
  }

  //#endregion

  


  //#region _______GET METHODS____________________________

  /**
   * Return true if timer is running
   */
   get Running(): boolean {
    return this._timer.running;
  }

  get time() {
    return this._timer.time;
  }

  get timeList() {
    return this._timer;
  }

  GetStartedTimes() {
    return this.timeList.start;
  }

  GetStoppedTimes() {
    return this.timeList.stop;
  }

  //#endregion



  //#region _______SET METHODS____________________________
  
  set timeList(timer: Timer) {
    this._timer = timer;
    this._timer.timeStopped = new Date(timer.timeStopped);
    this._timer.timeBegan = new Date(timer.timeBegan);
    if (timer.running) {
      this._timer.started = setInterval(this.clockRunning.bind(this), 10);
    }
  }

  //#endregion







  /**
   * Add digit-1 zeros at the begin of the number
   * @param num 
   * @param digit number of zeros
   * @returns 
   */
   zeroPrefix(num, digit) {
    let zero = '';
    for(let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }
  

  clockRunning(){
    let currentTime:any = new Date()
    let timeElapsed:any = new Date(currentTime - this._timer.timeBegan - this._timer.stoppedDuration)
    let hour = timeElapsed.getUTCHours()
    let min  = timeElapsed.getUTCMinutes()
    let sec  = timeElapsed.getUTCSeconds()
    let ms   = timeElapsed.getUTCMilliseconds();
    this._timer.time =
      this.zeroPrefix(hour, 2) + ":" +
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2);
  };

  /**
   * Calc difference between Start Date and End Date
   */
  calcDiff() {
    var ln = this.timeList.stop.length - 1;
    var init: any = this.timeList.start[ln];
    var end: any = this.timeList.stop[ln];
    
    var timeElapsed: any = new Date(end - init);

    let hour = timeElapsed.getUTCHours()
    let min = timeElapsed.getUTCMinutes()
    let sec = timeElapsed.getUTCSeconds()
    let ms = timeElapsed.getUTCMilliseconds();
    
    var diff =
      this.zeroPrefix(hour, 2) + ":" +
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2);

      this.timeList.diff.push(diff);
      this.timeList.diffms.push(timeElapsed);

    console.log(diff);
  }


  isTimerActive(): boolean {
    if (this._timer.running) return true;
    else if (this.timeList.start.length > 0) return true;
    return false;
  }

}
