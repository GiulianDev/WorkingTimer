import { Injectable } from '@angular/core';
// import { LocalNotification, Plugins } from '@capacitor/core';
// const { LocalNotifications } = Plugins;

import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification: LocalNotificationSchema;
  private notificationPromise: Promise<any>;
  private _ID: number = 439209432321129530;

  constructor() { }


  

  async addLocalNotification(msg: string = 'Timer is still running') {

    this.notification = {
      title: "YOU ARE LUCKY",
      body: msg,
      id: this._ID,
      smallIcon: 'res://logo',
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


  async deleteLocalNotification() {
    // await LocalNotifications.cancel(this._ID);
  }


  async getPending() {
    return await LocalNotifications.getPending();
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
