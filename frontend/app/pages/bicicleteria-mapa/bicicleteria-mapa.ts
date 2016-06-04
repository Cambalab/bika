import {Page, NavController, NavParams, Alert, Modal} from 'ionic-angular';
import * as _ from 'lodash';
import { ANGULAR2_GOOGLE_MAPS_PROVIDERS, ANGULAR2_GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import {FiltersModal} from '../modal-filters/modal-filters';
import { Bicicleteria } from '../../models/bicicleteria';
import { BicicleteriaService } from '../../services/bicicleteria-service';
import { Geolocation } from "ionic-native/dist/plugins/geolocation";

@Page({
  templateUrl: 'build/pages/bicicleteria-mapa/bicicleteria-mapa.html',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  styles: [`
    .sebm-google-map-container {
       height: 100%;
     }
  `]
})
export class BicicleteriaMapaPage {

  selectedItem: any;
  lng: number;
  lat: number;
  zoom: number;
  bicicleterias: Bicicleteria[];
  markers: any;

  constructor(private nav: NavController, navParams: NavParams, private bicicleteriaService: BicicleteriaService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.zoom = 15;
  }

  clickedMarker(bicicleteria) {
    // let confirm = Alert.create({
    //   title: bicicleteria.name,
    //   message: 'Av. Callao 1337 <small>(3km)</small><br/><br/><strong>Servicios:</strong><br/> <italic>Venta</italic> | <italic>Reparacion</italic> | <italic>Indumentaria</italic>',
    //   buttons: [
    //     {
    //       text: 'Mas Info',
    //       handler: () => {
    //         this.nav.push(BicicleteriaDetailsPage, {
    //           item: bicicleteria
    //         });
    //       }
    //     },
    //     {
    //       text: 'Ir!',
    //       handler: () => {
    //         console.log('Mostrar navegacion.');
    //       }
    //     }
    //   ]
    // });
    // this.nav.present(confirm);
  }

  openFiltersModal() {
    let modal = Modal.create(FiltersModal);
    this.nav.present(modal);
  }

  ngOnInit() {
    var geoSettings = {timeout: 15000, enableHighAccuracy: true};
    Geolocation.getCurrentPosition(geoSettings).then((position) => {
        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
        this.getBicicleterias();
      },
      function error(error) {
          alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      });
  }

  getBicicleterias() {
    this.bicicleteriaService.findNear(this.lng, this.lat).subscribe(
      data => {
        this.bicicleterias = data.result;
        this.markers = this.createMarkers(data.result,  {lat : 'lat', lng : 'lng', name : 'name'}, { title: 'name'});
      });
  }

  // XXX Transforma datos de las bicicleterias
  // data: json de bicicleterias, changes: cambios de nombre de keys,
  // extend: agregar nuevas keys con datos que viene
  createMarkers(data, changes, extend) {
    let extendedData = _.map(data, item => {
      let obj = _.mapValues(extend, value => { return item[value]; });
      return _.extend({}, item, obj);
    });

    let extendKeys = _.keys(extend);
    let searchKeys =  (_.keys(changes)).concat(extendKeys);
    _.extend( changes, _.zipObject(extendKeys, extendKeys));

    return _.map(extendedData, item => {
      let plucked =  _.partial(_.pick, item).apply(null, searchKeys);
      return _.mapKeys(plucked, (value, key) => { return changes[key]; });
    });

  }
}
