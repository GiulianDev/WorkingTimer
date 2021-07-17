import { Injectable } from '@angular/core';
import { LocalNotification, Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification: LocalNotification;

  constructor() { }


  

  async addLocalNotification() {

    this.notification = {
      title: "aaaa",
      body: `You open this`,
      id: this.Date2Id(),
      smallIcon: 'house',
      actionTypeId: 'OPEN_PRODUCT',
      schedule: {
        // every: "day",
        // on: 	{ year: year, month: month, day: day, hour: hh, minute: mm },
        at: this.getDelayedTime()
      },
      extra: {
      }
    };

    console.log("Adding notification...", this.notification);

    await LocalNotifications.schedule({
      notifications: [
        this.notification
      ]
    });
    
    // let msg = 'Added notification at ';
    // this.presentToast(msg);
  }

  /**
   * 
   * @returns number of seconds from 1970
   */
  Date2Id(): number {
    let seconds = Math.floor(Date.now() / 1000);
    return seconds;
  }
  
  /**
   * 
   * @param seconds seconds to delay
   * @returns delayed current time of specified seconds
   */
  getDelayedTime(seconds:number = 1): Date {
    var date = new Date();
    // add a second
    date.setDate(date.getTime() + seconds * 1000);
    return date;
  }

}
