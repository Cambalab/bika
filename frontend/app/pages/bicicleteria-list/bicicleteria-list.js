import {Page, NavController, NavParams, Modal} from 'ionic-angular';
import {BicicleteriaDetailsPage} from '../bicicleteria-details/bicicleteria-details';
import {BicicleteriaService} from '../../services/bicicleteria-service';
import {Geolocation} from 'ionic-native';
import {FilterPage, FiltersModal} from '../modal-filters/modal-filters';

@Page({
  templateUrl: 'build/pages/bicicleteria-list/bicicleteria-list.html'
})

export class BicicleteriaListPage {

  static get parameters() {
    return [[NavController], [NavParams], [BicicleteriaService]];
  }

  constructor(nav, navParams, bicicleteriaService, abrirModal) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.bicicleteriaService = bicicleteriaService;

    Geolocation.getCurrentPosition().then((resp) => {
       console.log("Latitude: ", resp.coords.latitude);
       console.log("Longitude: ", resp.coords.longitude);
    })
  }

  openFiltersModal() {
    let modal = Modal.create(FiltersModal);
    this.nav.present(modal);
  }

  ngOnInit() {
    this.getBicicleterias();
  }

  getBicicleterias() {
    this.bicicleteriaService.findAll().subscribe(data => this.bicicleterias = data);
  }

  itemTapped(event, bicicleteria) {
     this.nav.push(BicicleteriaDetailsPage, {
       item: bicicleteria
     });
  }
}
