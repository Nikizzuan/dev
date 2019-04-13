import { Injectable } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { TodoService, Todo } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class LocalnotificationService {
  scheduled = [];

  Voucherinfo: Todo;
  constructor(public navCtrl: NavController,
    private plt: Platform,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private voucherservices: TodoService) {

      this.plt.ready().then(() => {
        this.localNotifications.on('click').subscribe(res => {
          const msg = res.data ? res.data.mydata : '';
          const vid = res.data ? res.data.voucherid : '';
          const index = res.data ? res.data.userindex : '';

          if (msg === 'Donation') {
            if (vid) {
              this.donateVoucher(vid, index);

            }
          } else if (msg === 'Delection') {
            this.DeleteVoucher(vid);
          }
        //  this.showAlert(res.title, res.text, msg);

        });

        this.localNotifications.on('trigger').subscribe(res => {
          const msg = res.data ? res.data.mydata : '';
          const vid = res.data ? res.data.voucherid : '';
          const index = res.data ? res.data.userindex : '';
       //   this.showAlert(res.title, res.text, msg);
          if (msg === 'Donation') {
            if (vid) {
              this.donateVoucher(vid, index);

            }
          } else if (msg === 'Delection') {
            this.DeleteVoucher(vid);
          }

        });
      });


    }



  scheduleNotificationRetailer(NotiID: number, time: number, msgdata: string, vucherID: any, notititle: string, notitext: string) {
    this.localNotifications.schedule({
      id: NotiID,
      title: notititle,
      text: notitext,
      data: { mydata: msgdata, voucherid: vucherID },
      trigger: { in: time, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true // Show the notification while app is open
    });

  }
  scheduleNotificationUser(NotiID: number, time: number, msgdata: string, vucherID: any,
    UserIndex: any, notititle: string, notitext: string) {
    this.localNotifications.schedule({
      id: NotiID,
      title: notititle,
      text: notitext,
      data: { mydata: msgdata, voucherid: vucherID, userindex: UserIndex },
      trigger: { in: time + 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground: true // Show the notification while app is open
    });

  }


  recurringNotification() {
    this.localNotifications.schedule({
      id: 22,
      title: 'Recurring',
      text: 'Simons Recurring Notification',
      trigger: { every: ELocalNotificationTriggerUnit.MINUTE }
    });
  }

  repeatingDaily() {
    this.localNotifications.schedule({
      id: 42,
      title: 'Good Morning',
      text: 'Code something epic today!',
      trigger: { every: { hour: 9, minute: 30 } }
    });
  }

    showAlert(header, sub, msg) {
      this.alertCtrl.create({
        header: header,
        subHeader: sub,
        message: msg,
        buttons: ['Ok']
      }).then(alert => alert.present());
    }

    getAll() {
      this.localNotifications.getAll().then((res: ILocalNotification[]) => {
        this.scheduled = res;
      });
    }

    donateVoucher(vid: any, index: any) {


      this.loadvoucher(vid);

      const amount = this.Voucherinfo.usersCouponID[1].voucherBalance;
      this.Voucherinfo.usersCouponID = null;
      this.voucherservices.Updatetod(this.Voucherinfo, vid).then(() => {
        // this.Addtransaction(amount, 'donation');
      });

   console.log('donate voucher');
    }

    DeleteVoucher(vid: any) {


      this.voucherservices.removeTodo(vid).then(() => {
        console.log('delete  voucher');
    });


       }

       Addtransaction(amount: number, title: string) {

       }


       loadvoucher(id: any ) {

        this.voucherservices.getTodo(id).subscribe( res => {
          this.Voucherinfo = res;

        });

       }


}
