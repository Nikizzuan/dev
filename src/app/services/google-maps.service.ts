import { Injectable } from '@angular/core';
import { ConnectivityServiceService } from './connectivity-service.service';
declare var google;

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  google: any;
  mapInitialised = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  currentMarker: any;
  location = {lat: null, lng: null};
  mapOptions: any;
  apiKey: any = 'AIzaSyCC8Z7uxZy1-pVtq6tJlRt6nNY71zpkWoc';

  constructor(public connectivityService: ConnectivityServiceService, public geolocation: Geolocation) {

  }

  init(mapElement: any, pleaseConnect: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;

    return this.loadGoogleMaps();

  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google === 'undefined' || typeof google.maps === 'undefined') {

        console.log('Google maps JavaScript needs to be loaded.');
        this.disableMap();


        if (this.connectivityService.isOnline()) {

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          };

          const script = document.createElement('script');
          script.id = 'googleMaps';

          if (this.apiKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      } else {

        if (this.connectivityService.isOnline()) {
          this.initMap();
          this.enableMap();
        } else {
          this.disableMap();
        }

        resolve(true);

      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised  = true;

    return new Promise((resolve) => {

    /* this.geolocation.getCurrentPosition().then((position) =>  {
        this.location.lat = position.coords.latitude;
        this.location.lng = position.coords.longitude;

    });*/

    this.location.lat = 5.356013;
    this.location.lng = 100.302528;

    this.mapOptions = {
      center: this.location,
      zoom: 17,
      mapTypeControl: false
  };

  this.map = new google.maps.Map(this.mapElement, this.mapOptions);
  resolve(true);


    });

  }

  disableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = 'block';
    }

  }

  enableMap(): void {

    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = 'none';
    }

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      setTimeout(() => {

        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
          this.loadGoogleMaps();
        } else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {

      this.disableMap();

    });

  }

}
