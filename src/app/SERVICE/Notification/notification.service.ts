import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

// import { LocalNotification, Plugins } from '@capacitor/core';
// const { LocalNotifications } = Plugins;

import { LocalNotifications, LocalNotificationSchema } from '@capacitor/local-notifications';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification: LocalNotificationSchema;
  private _ID: number = 439209432321129530;
  private _ID2: number = 87786976667880798;

  constructor(public toastController: ToastController) { }



  async addNotification(time: string) {

    await this.deleteLocalNotification();

    console.log("Adding notification...");
    
    let [hh, mm] = time.split(":");
    let msg = "next alarm at " + time;
    var today = new Date();
    var alarmDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), +hh, +mm, 0);
    if (alarmDate < today) {
      alarmDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, +hh, +mm, 0);
    }
    console.log("Next alarm date: ", alarmDate);
    this.notification = {
      title: "HURRY",
      body: msg,
      id: this._ID,
      smallIcon: 'res://logo',
      schedule: {
        at: alarmDate,
        repeats: true
      },
      extra: {
      }
    };
    await LocalNotifications.schedule({
      notifications: [
        this.notification
      ]
    });
    this.presentToast(msg, 1);
  }





  async presentToast(msg: string, time = 1) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000 * time
    });
    toast.present();
  }








  

  async addLocalNotification(msg: string = 'Timer is still running') {

    this.notification = {
      title: "YOU ARE LUCKY",
      body: msg,
      id: this._ID2,
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
  }


  /**
   * Cancel notification by id
   * @param id 
   * @returns 
   */
  async deleteLocalNotification() {
    console.log("Deleting notification");
    return LocalNotifications.getPending().then( res => {
      var index = res.notifications.map(x => {
        return x["id"];
      }).indexOf(this._ID);
      console.log("index: ", index);
      res.notifications.splice(index, 1);
      LocalNotifications.cancel(res);
    }, err => {
      console.log(err);
    })

  }


  async update() {
    // return await LocalNotifications.update();
  }

  getPending() {
    return LocalNotifications.getPending();
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
    var date = new Date(Date.now() + seconds * 1000);
    return date;
  }

}
