import {Page, Component, NavController, NavParams, Alert, Modal} from 'ionic-angular';
import {BicicleteriaDetailsPage} from '../bicicleteria-details/bicicleteria-details';
import {BicicleteriaService} from '../../services/bicicleteria-service';
import {Geolocation} from 'ionic-native';
import * as _ from 'lodash'
import { ANGULAR2_GOOGLE_MAPS_PROVIDERS, ANGULAR2_GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';
import {FilterPage, FiltersModal} from '../modal-filters/modal-filters';

@Page({
  templateUrl: 'build/pages/bicicleteria-mapa/bicicleteria-mapa.html',
  directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES],
  styles: [`
    .sebm-google-map-container {
       height: 300px;
     }
  `]
})
export class BicicleteriaMapaPage {

  static get parameters() {
    return [[NavController], [NavParams], [BicicleteriaService]];
  }

  constructor(nav, navParams, bicicleteriaService, abrirModal) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.bicicleteriaService = bicicleteriaService;

    Geolocation.getCurrentPosition().then((resp) => {
      this.lng = resp.coords.longitude;
      this.lat = resp.coords.latitude;
      this.zoom = 15;
    })
  }

  clickedMarker(bicicleteria) {
    let confirm = Alert.create({
      title: bicicleteria.name,
      message: 'Av. Callao 1337 <small>(3km)</small><br/><br/><strong>Servicios:</strong><br/> <italic>Venta</italic> | <italic>Reparacion</italic> | <italic>Indumentaria</italic>',
      buttons: [
        {
          text: 'Mas Info',
          handler: () => {
            this.nav.push(BicicleteriaDetailsPage, {
              item: bicicleteria
            });
          }
        },
        {
          text: 'Ir!',
          handler: () => {
            console.log('Mostrar navegacion.');
          }
        }
      ]
    });
    this.nav.present(confirm);
  }

  openFiltersModal() {
    let modal = Modal.create(FiltersModal);
    this.nav.present(modal);
  }

  ngOnInit() {
    this.getBicicleterias();
  }

  getBicicleterias() {
    this.bicicleteriaService.findAll().subscribe(
      data => {
        this.bicicleterias = data;
        this.markers = this.createMarkers(data,  {lat : 'lat', lng : 'lng', name : 'name'}, { title: 'name'});
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
    let searchKeys = _.concat( _.keys(changes), extendKeys );
    _.extend( changes, _.zipObject(extendKeys, extendKeys));

    return _.map(extendedData, item => {
      let plucked =  _.partial(_.pick, item).apply(null, searchKeys);
      return _.mapKeys(plucked, (value, key) => { return changes[key]; });
    });

  }

}
