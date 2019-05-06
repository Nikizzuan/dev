import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-viewnoti',
  templateUrl: './viewnoti.page.html',
  styleUrls: ['./viewnoti.page.scss'],
})
export class ViewnotiPage implements OnInit {


  notification:  Notification = {

    icon: 'notifications-outline',
    img:  '../assets/img/uploadimage.png',
    title: 'test',
    // tslint:disable-next-line:max-line-length
    message: '',
    date: Date.now(),
    group: '',
    recevierid: ''

   };
   notificationId = null;

  constructor(private notificationservice: NotificationService,
    private route: ActivatedRoute,
    private navctrl: NavController, ) { }

  ngOnInit() {

    this.notificationId = this.route.snapshot.params['id'];


    if (this.notificationId) {
      this.loadnoti();

    }
  }


  loadnoti() {
    this.notificationservice.getnotification(this.notificationId).subscribe( res => {
      this.notification = res;
    });
  }

  goBack() {

    this.navctrl.goBack();

  }


}
