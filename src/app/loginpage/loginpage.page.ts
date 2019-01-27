import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RetailerinfoService } from '../services/retailerinfo.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage   implements OnInit  {

  loginForm: FormGroup;

  userID: any;
  userauth: Observable<firebase.User>;
  authState: any = null;

  constructor( private userservice: RetailerinfoService, private route: ActivatedRoute, private authservice: AuthService,
    private afAuth: AngularFireAuth, public navCtrl: NavController) {}

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

        this.userID = user.uid;
      if (this.userID) {
        this.loadUser();

      }
    });


      }


      loadUser() {
        this.userservice.getUser(this.userID).subscribe( res => {

          if (res === undefined) {
            this.navCtrl.navigateForward('registerpage');
          } else {
            if (res.usertype === 'Student' || res.usertype === 'Staff' ) {
              this.navCtrl.navigateForward('home');
            } else if (res.usertype === 'Retailer' ) {
              this.navCtrl.navigateForward('retailerhomepage');
            }
          }

        });
}
}
