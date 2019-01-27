import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google: any;
@Component({
  selector: 'app-googlemaps',
  templateUrl: './googlemaps.component.html',
  styleUrls: ['./googlemaps.component.scss']
})
export class GooglemapsComponent  {

  @ViewChild('Map') mapElement: ElementRef;
  map: any;
  mapOptions: any;
  location = {lat: null, lng: null};
  markerOptions: any = {position: null, map: null, title: null};
  marker: any;
  geocoder: any;
  address = 'Jalan Universiti, 11800 Gelugor, Pulau Pinang';
  apiKey: any = 'AIzaSyCC8Z7uxZy1-pVtq6tJlRt6nNY71zpkWoc'; /*Your API Key*/
 options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
};

  constructor(public zone: NgZone, public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder)  {
    /*load google map script dynamically */
      const script = document.createElement('script');
      // this.geocoder = new google.maps.Geocoder();


      script.id = 'googleMap';
      if (this.apiKey) {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey;
      } else {
          script.src = 'https://maps.googleapis.com/maps/api/js?key=';
      }
      document.head.appendChild(script);
      /*Get Current location*/
      this.geolocation.getCurrentPosition().then((position) =>  {
          this.location.lat = 5.356013;
          this.location.lng = 100.302528;
      });
      /*Map options*/
      this.mapOptions = {
          center: this.location,
          zoom: 17,
          mapTypeControl: false
      };

      setTimeout(() => {
          this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
          /*Marker Options*
          this.geocoder.geocode({'address': this.address}, function(results, status) {
            if (status === 'OK') {
                this.markerOptions.position = results[0].geometry.location;
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
              }
           });*/

           this.nativeGeocoder.forwardGeocode(this.address, this.options)
            .then((coordinates: NativeGeocoderForwardResult[]) =>
            console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
            .catch((error: any) => console.log(error));

        this.markerOptions.position = this.location;
          this.markerOptions.map = this.map;
          this.markerOptions.title = 'subaidah';
          this.marker = new google.maps.Marker(this.markerOptions);
      }, 3000);
  }



}
