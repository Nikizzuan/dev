import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../services/notification.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerinfoService, Userinfo } from '../services/retailerinfo.service';
import { Observable } from 'rxjs';
import { element } from '@angular/core/src/render3';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  notification: any = [];

  userinfos: Userinfo;
  userId = null;


  userauth: Observable<firebase.User>;
  authState: any = null;

  constructor(    private notificationservice: NotificationService,
    private navctrl: NavController,
    private authservice: AuthService,
    private gplus: GooglePlus,
    private afAuth: AngularFireAuth,
    private userservice: RetailerinfoService, ) {

  }

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.userId = user.uid;
      if (this.userId) {
        this.loaduser();
      }
    });

  }


  loaduser() {
    this.userservice.getUser(this.userId).subscribe( res => {
     if (res.usertype === 'Student') {
      this.loadtransaction('Student', 'All');
     } else if (res.usertype === 'Staff') {
      this.loadtransaction('Staff', 'All');

     } else if (res.usertype === 'Retailer') {
      this.loadtransaction('Retailer', 'All');

     }

    });

  }

   loadtransaction(group1: string, group2: string) {

    this.notification  = [];
    this.notificationservice.getCollectionoTtran().subscribe( res => {
      // this.notification = res;

      for (let index = 0; index < res.length ; index++) {

        if (res[index].group === group1 ) {
          this.notification.push(res[index]);


        } else if (res[index].group === group2 ) {
          this.notification.push(res[index]);

        } else if (res[index].recevierid === this.userId ) {
          this.notification.push(res[index]);
        }

      }

    });


   }


   signOut() {
    this.gplus.logout().then(() => {
      this.authservice.signOut();
    });
}

}
