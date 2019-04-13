import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RetailerinfoService, Userinfo } from '../services/retailerinfo.service';
declare var google: any;

@Component({
  selector: 'app-merchant-outlet',
  templateUrl: './merchant-outlet.page.html',
  styleUrls: ['./merchant-outlet.page.scss'],
})
export class MerchantOutletPage  {

  // maps
users: Userinfo[];
map: any;
GoogleAutocomplete: any;
autocomplete: any;
autocompleteItems: any;
geocoder: any;
markers: any[];


  constructor(private authservice: AuthService,
    public zone: NgZone,
    private userservice: RetailerinfoService) {

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
        center: { lat: 5.355933, lng: 100.302518 },
        zoom: 15
      });
      this.clearMarkers();
      // set marker
      this.userservice.oninitmaker();
      this.userservice.getUsers().subscribe( res => {
          this.users = res;
          this.loopthruuser(this.users);
        });
    }

    loopthruuser(user) {

      user.forEach(element => {

          if (element.usertype === 'Retailer') {
              this.addmarker(element.StoreLocid);
          }

      });


    }

    addmarker(id) {

      console.log(id);
     // this.clearMarkers();
      this.autocompleteItems = [];

      this.geocoder.geocode({'placeId': id}, (results, status) => {
        if (status === 'OK' && results[0]) {
          const position = {
              lat: results[0].geometry.location.lat,
              lng: results[0].geometry.location.lng
          };
          const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            icon: { url : '../assets/img/restoran.png' },
            animation: google.maps.Animation.BOUNCE,
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




  signOut() {
    this.authservice.signOut();
  }

}
