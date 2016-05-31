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

  constructor(nav, navParams, bicicleteriaService) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.bicicleteriaService = bicicleteriaService;

    Geolocation.getCurrentPosition().then((resp) => {
      this.lng = resp.coords.longitude;
      this.lat = resp.coords.latitude;console.log();
      this.zoom = 15;
    })
  }

  openFiltersModal() {
    let modal = Modal.create(FiltersModal);
    this.nav.present(modal);
  }

  ngOnInit() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.lng = resp.coords.longitude;
      this.lat = resp.coords.latitude;console.log();
      this.zoom = 15;
      this.getBicicleterias();
    })
  }

  getBicicleterias() {
    this.bicicleteriaService.findNear(this.lng, this.lat).subscribe(data => this.bicicleterias = data.result );
  }

  itemTapped(event, bicicleteria) {
     this.nav.push(BicicleteriaDetailsPage, {
       item: bicicleteria
     });
  }
}
