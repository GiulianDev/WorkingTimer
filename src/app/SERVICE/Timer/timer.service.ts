import { Injectable } from '@angular/core';
import { TimeList, timeToString } from 'src/app/MODELS/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class TimerService {


  private _timer: number = 0;
  private timer;


  public timeBegan = null
  public timeStopped:any = null
  public stoppedDuration:any = 0
  public started = null
  public running = false
  public blankTime = "00:00.00"
  public time: string = "00:00.00"
  public timeList: TimeList = new TimeList;
  public stoppedList: Date[] = [];
  public startedList: Date[] = [];



  constructor() { }


  /**
   * Start timer
   */
  start() {
    if(this.running) return;
    if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      let newStoppedDuration:any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.timeList.start.push(new Date());
    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  }
    
  stop() {
    this.running = false;
    this.timeStopped = new Date();
    this.timeList.stop.push(this.timeStopped);
    this.calcDiff();
    clearInterval(this.started);
  }
  
  reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = this.blankTime;
      this.timeList = new TimeList;

  }
  
  zeroPrefix(num, digit) {
    let zero = '';
    for(let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }
  
  clockRunning(){
    let currentTime:any = new Date()
    let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
    let hour = timeElapsed.getUTCHours()
    let min  = timeElapsed.getUTCMinutes()
    let sec  = timeElapsed.getUTCSeconds()
    let ms   = timeElapsed.getUTCMilliseconds();
    this.time =
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



    // var total = this.timeList.totalms + timeElapsed;
    // console.log(total);
    // hour = total.getUTCHours()
    // min = total.getUTCMinutes()
    // sec = total.getUTCSeconds()
    // ms = total.getUTCMilliseconds();
    // diff =
    //   this.zeroPrefix(hour, 2) + ":" +
    //   this.zeroPrefix(min, 2) + ":" +
    //   this.zeroPrefix(sec, 2);

    //   this.timeList.total = diff;
    
  }

  GetTime() {
    return this.time;
  }

  GetTimeList() {
    return this.timeList;
  }

  GetStartedTimes() {
    return this.timeList.start;
  }

  GetStoppedTimes() {
    return this.timeList.stop;
  }

  /**
   * 
   * @returns current hour and minutes as number (ex. 13:15 => 1315)
   */
   getCurrentTimeAsIndex() {
    let current = new Date();
    let hour = current.getHours()
    let min = current.getMinutes()
    let dateStr = this.zeroPrefix(hour, 2) + ":" + this.zeroPrefix(min, 2);
    let dateIdx = timeToString(dateStr);
    return dateIdx;
  }

}
