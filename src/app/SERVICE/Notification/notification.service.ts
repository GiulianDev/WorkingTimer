import { Injectable } from '@angular/core';
import { LocalNotification, Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification: LocalNotification;

  constructor() { }


  /*

  async addLocalNotification() {

    this.notification = {
      title: "aaaa",
      body: `You open this ${test}`,
      id: photo.id,
      smallIcon: 'house',
      actionTypeId: 'OPEN_PRODUCT',
      schedule: {
        at: tomorrow,
        every: "day",
        // on: 	{ year: year, month: month, day: day, hour: hh, minute: mm },
        repeats: photo.reminders[0].repeat
      },
      attachments: [{id: photo.id.toString(), url: photo.webviewPath}],
      extra: {
        timeStamp: photo.timeStamp
      }
    };

    console.log("Adding notification...", this.notification);

    await LocalNotifications.schedule({
      notifications: [
        this.notification
      ]
    });
    
    let d = tomorrow.toLocaleString();
    let msg = 'Added notification at ' + d;
    msg = msg.substring(0, msg.length - 3);
    this.presentToast(msg);
  }



  */

}
