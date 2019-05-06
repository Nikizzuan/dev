import { Injectable } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit, ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { TodoService, Todo } from './todo.service';
import { AdminaccountService, Transaction2 } from './adminaccount.service';
import { NotificationService, Notification } from './notification.service';
import { Router } from '@angular/router';
import { RetailerinfoService, Userinfo } from './retailerinfo.service';

@Injectable({
  providedIn: 'root'
})
export class LocalnotificationService  {
  scheduled = [];

  transaction:  Transaction2 = {
    icon: 'arrow-down',
    icon2: 'remove',
    title: '',
    amount: 0,
    date: Date.now(),
    expense:  false,
    month: 0,
    username: '',
    retailername: '',
    totalbalance: 0


 };




 notification:  Notification = {

  icon: 'notifications-outline',
  img: null,
  title: ' E-wallet Redemption Approve',
  message: '',
  date: Date.now(),
  recevierid: '',
  group: 'none'

 };

 userinfos: Userinfo;
 userinfos2: Userinfo;

 Notificationid: any;
 donationAmount: any;
 Notificationid2: any;
 ADMINID = 'TMFUWOirDNNFlLFmEVSvxlQwiju1';


  Voucherinfo: Todo;
  constructor(public navCtrl: NavController,
    private plt: Platform,
    private localNotifications: LocalNotifications,
    private alertCtrl: AlertController,
    private voucherservices: TodoService,
    private adminservice: AdminaccountService,
    private notificationservice: NotificationService,
    private router: Router,
    private userservice: RetailerinfoService
    ) {

      this.plt.ready().then(() => {
        this.localNotifications.on('click').subscribe(res => {
          const msg = res.data ? res.data.mydata : '';
          const vid = res.data ? res.data.voucherid : '';
          const index = res.data ? res.data.userindex : '';
          this.Notificationid = res.data ? res.data.notiid : '';
          this.Notificationid2 = vid + Date.now();
         // this.donationAmount =   res.data ? res.data.amount : '';
          this.notification.title = res.title;

         /// this.loadadmin();

          if (msg === 'Donation') {
            if (vid) {
              this.donateVoucher(vid, index);

            }
          } else if (msg === 'Delection') {
            // num 2
            this.DeleteVoucher(vid);
          } else {
          //  this.loadvoucher(vid);
          //  this.addnotification4(this.Voucherinfo.CuponName);
          }
        //  this.showAlert(res.title, res.text, msg);

        });

        this.localNotifications.on('trigger').subscribe(res => {
          const msg = res.data ? res.data.mydata : '';
          const vid = res.data ? res.data.voucherid : '';
          const index = res.data ? res.data.userindex : '';
          this.Notificationid = res.data ? res.data.notiid : '';
        //  this.donationAmount =   res.data ? res.data.amount : '';
          this.notification.title = res.title;

       //   this.showAlert(res.title, res.text, msg);
          if (msg === 'Donation') {
            if (vid) {
              this.donateVoucher(vid, index);

            }
          } else if (msg === 'Delection') {
            // num 1
            this.DeleteVoucher(vid);
          } else {
      //      this.loadvoucher(vid);
      //      this.addnotification4(this.Voucherinfo.CuponName);
          }

        });


      });

    }

    loadadmin() {
      this.userservice.getUser(this.ADMINID).subscribe( res => {
        this.userinfos = res;
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
  scheduleNotificationUser(NotiID: number, time: number, msgdata: string, vucherID: any, Notifiid: any,
    UserIndex: any, notititle: string, notitext: string) {
    this.localNotifications.schedule({
      id: NotiID,
      title: notititle,
      text: notitext,
      data: { mydata: msgdata, voucherid: vucherID, userindex: UserIndex, notiid: Notifiid },
      trigger: { at: new Date(time) },
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


      this.voucherservices.getTodo(vid).subscribe( res => {
        this.Voucherinfo = res;
    this.donationAmount = this.Voucherinfo.usersCouponID[index].voucherBalance;

     this.Voucherinfo.usersCouponID[index].voucherUserId = null;

  });

  this.voucherservices.Updatetod(this.Voucherinfo, vid).then(() => {
    // this.Addtransaction(amount, 'donation');
    // tslint:disable-next-line:max-line-length
    this.addaccountinfo(this.donationAmount,  'An Expired Voucher from the system has Donate RM ' + this.donationAmount + ' to the Charity' );
  });


    }

    DeleteVoucher(vid: any) {


      this.voucherservices.getTodo(vid).subscribe( res => {
        this.Voucherinfo = res;
      this.Voucherinfo.expire = 'true';
    });

    this.voucherservices.Updatetod(this.Voucherinfo, vid).then(() => {

      this.addnotification3(this.Voucherinfo.CuponName);
    });

       }




       addaccountinfo(amount: number, title: any) {


        this.transaction.title = title;
        this.transaction.amount = amount;
        this.transaction.totalbalance = - amount;
        this.transaction.month = new Date().getMonth();
        this.transaction.username = ' Expire Voucher ';
        if (this.transaction.title === title ) {
          this.adminservice.addtransaction(this.transaction).then(() => {

            this.addnotification(amount);
          });
        }


      }

      addnotification(amount: number) {

        // tslint:disable-next-line:max-line-length
        this.notification.message = 'Your remain Expire Voucher of RM ' + amount.toString() + ' has been donated  to the charity.ty';
        this.notification.recevierid = this.Notificationid;
        this.notificationservice.addnotification2(this.notification, this.Notificationid2).then(() => {
    //      this.LOADADMIN();
         this.router.navigateByUrl( '/viewnoti/' + this.Notificationid2);

        });

      }

      addnotification3(name: string) {

        // tslint:disable-next-line:max-line-length
        this.notification.message = 'Your Voucher ' + name + ' has expired';
        this.notification.recevierid = this.Notificationid;
        this.notificationservice.addnotification2(this.notification, this.Notificationid2).then(() => {

        });

      }


      addnotification4(name: string) {

        // tslint:disable-next-line:max-line-length
        this.notification.message = 'Your Voucher ' + name + ' will be expire in 12 hours, and the expire amount will be automaticly donate to charity';
        this.notification.recevierid = this.Notificationid;
        this.notificationservice.addnotification2(this.notification, this.Notificationid2).then(() => {

        });

      }


      LOADADMIN() {

        this.userinfos2.eWallet =  this.userinfos2.eWallet - this.transaction.amount;
        this.userservice.UpdateUser(this.userinfos2, this.ADMINID).then(() => {

        } );
      }







}
