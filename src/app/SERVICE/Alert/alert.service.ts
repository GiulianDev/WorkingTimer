import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

  /**
   * 
   * @param msg message to display
   * @param subheader (optional) subheader to display (Default null)
   * @param header (optional) header to display (Default 'WAIT')
   * @returns 
   * Use as:
   * this.myservice.presentConfirmAlert('message')
   * .then(res => {
   *   if (res) {
   *     // codes
   *   }
   * });
   */
  async presentConfirmAlert(msg: string = 'Are you sure?', subheader: string | null = null, header: string = 'WOOOPS'): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: header,
        subHeader: subheader,
        message: msg,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve(false);
            }
          }, {
            text: 'Continue',
            handler: (ok) => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();
    });
  }


  async presentWarningAlert(msg: string = 'Are you sure?', subheader: string | null = null, header: string = 'WOOOPS'): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: header,
        subHeader: subheader,
        message: msg,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            cssClass: 'secondary',
          }
        ]
      });
      alert.present();
    });
  }

  async presentConfirm(header: any, message: any,cancelText: any,okText: any): Promise<any> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve('cancel');
            }
          }, {
            text: okText,
            handler: (ok) => {
              resolve('ok');
            }
          }
        ]
      });
      alert.present();
    });
  }


}
