import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

@Component({
  selector: 'mapa',
  inputs: ['lat', 'lng', 'zoom', 'markers:markers'],
  templateUrl: 'build/components/mapa/mapa.html',
  directives: [IONIC_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
  `],
})
export class Mapa {
  constructor() {
  }

  clickedMarker(label, index) {
    window.alert(`clicked the marker: ${label || index}`)
  }
}
