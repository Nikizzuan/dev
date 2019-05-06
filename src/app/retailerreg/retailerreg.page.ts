import { Component, OnInit, NgZone } from '@angular/core';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LocationSelectPage } from '../location-select/location-select.page';
import { FcmService } from '../services/fcm.service';
import { FCM } from '@ionic-native/fcm/ngx';
declare var google;
@Component({
  selector: 'app-retailerreg',
  templateUrl: './retailerreg.page.html',
  styleUrls: ['./retailerreg.page.scss'],
})
export class RetailerregPage  {

  private loginForm: FormGroup;
  loginError: string;

  user: Userinfo = {
    userName: '',
    matricNum: '',
    email: '',
    usertype: 'Retailer',
    storeAdress: '',
    storeName: '',
    University: 'Universiti Sains Malaysia',
    UniversirtyPoint: 0,
    myeventplaner: 'null',
    myqrplaner: 'true',
    StoreLocid: '',
    eWallet: 0,
    academicYear: '',
    storeUniqeID: '',
    storetype: '',
    approval: 'unapprove',
    date: Date.now()
};

// maps
map: any;
GoogleAutocomplete: any;
autocomplete: any;
autocompleteItems: any;
geocoder: any;
markers: any[];



tabsinfo: any;
userID: any;
// modal: any;
userauth: Observable<firebase.User>;
authState: any = null;

  constructor(private userservice: RetailerinfoService, private route: ActivatedRoute, private authservice: AuthService,
    public zone: NgZone, private afAuth: AngularFireAuth, public modalCtrl: ModalController, public navCtrl: NavController,
    private fcm2: FcmService,  fb: FormBuilder,   private fcm: FCM    ) {


/*
      this.loginForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
         });
*/


    this.tabsinfo = null;
    // maps
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];

    this.geocoder = new google.maps.Geocoder;
    this.markers = [];

      }

      ionViewDidEnter() {
        // Set latitude and longitude of some place
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: 5.355954, lng: 100.302519 },
          zoom: 15
        });
      }





  saveUser() {


 /*   const data = this.loginForm.value;
    */
    if (this.user.storetype === '') {
    return;
    }



    this.userservice.addUser(this.user).then(() => {
      this.fcm2.getToken();
      this.fcm.subscribeToTopic('All');
      this.fcm.unsubscribeFromTopic('Student');
      this.fcm.subscribeToTopic('Retailer');
      this.fcm.unsubscribeFromTopic('Staff');
      this.navCtrl.navigateForward('watingpage');
    });

    /* if (this.userID) {
      this.userservice.UpdateUser(this.user, this.userID).then(() => {
      });
    } else {

       this.userservice.addUser(this.user).then(() => {
       });
    }
    */
  }





  Nextface() {
    this.user.email = this.authservice.currentUserEmail;
    console.log(this.authservice.currentUserEmail);
    this. tabsinfo = 1;
  }

  // maps

  updateSearchResults() {
    if (this.autocomplete.input === '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(item) {

    this.user.StoreLocid = item.place_id;
    this.user.storeAdress = item.description;
   this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if (status === 'OK' && results[0]) {
        const position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };
        const marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
        });
        console.log(marker);
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  setMapOnAll(map) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

}
