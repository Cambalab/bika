import {Page, Component, NavController, NavParams} from 'ionic-angular';
import {BicicleteriaDetailsPage} from '../bicicleteria-details/bicicleteria-details';
import {BicicleteriaService} from '../../services/bicicleteria-service';
import {Geolocation} from 'ionic-native';
import {Mapa} from '../../components/mapa/mapa';
import * as _ from 'lodash'

@Page({
  templateUrl: 'build/pages/bicicleteria-list/bicicleteria-list.html',
  directives: [Mapa]
})
export class BicicleteriaListPage {

  static get parameters() {
    return [[NavController], [NavParams], [BicicleteriaService]];
  }

  constructor(nav, navParams, bicicleteriaService) {
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

  ngOnInit() {
    this.getBicicleterias();
  }

  getBicicleterias() {
    this.bicicleteriaService.findAll().subscribe(
        data => {
          this.bicicleterias = data;
          this.markers = this.createMarkers(data,  {lat : 'lat', lng : 'lng', name : 'label'}, { title: 'name'} );
        });
  }

  // Transforma datos de las bicicleterias
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

  itemTapped(event, bicicleteria) {
     this.nav.push(BicicleteriaDetailsPage, {
       item: bicicleteria
     });
  }
}
