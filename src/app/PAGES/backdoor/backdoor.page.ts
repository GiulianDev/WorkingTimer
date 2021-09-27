import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/SERVICE/Notification/notification.service';

@Component({
  selector: 'app-backdoor',
  templateUrl: './backdoor.page.html',
  styleUrls: ['./backdoor.page.scss'],
})
export class BackdoorPage implements OnInit {


  public notifications: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.getPending()
    .then(res => {
      this.notifications = res.notifications;
      console.log("Notifications: ", this.notifications);
    })
  }

}
