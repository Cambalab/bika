import {Page} from 'ionic-angular';
import { Bicicleteria } from '../../models/bicicleteria';
import { BicicleteriaService } from '../../services/bicicleteria-service';
import { NavController } from 'ionic-angular/components/nav/nav-controller';
import { NavParams } from 'ionic-angular/components/nav/nav-params';
import { Geolocation } from 'ionic-native/dist/plugins/geolocation';
import { BicicleteriaDetailsPage } from '../bicicleteria-details/bicileteria-details';
import { Modal } from 'ionic-angular/components/modal/modal';
import { FiltersModal } from '../modal-filters/modal-filters';
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Page({
  templateUrl: 'build/pages/bicicleteria-list/bicicleteria-list.html',
})
export class BicicleteriaListPage implements OnInit {

  bicicleterias: Bicicleteria[];
  selectedItem: any;
  lng: number;
  lat: number;
  zoom: number;

  constructor(private nav: NavController, navParams: NavParams, private bicicleteriaService: BicicleteriaService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    Geolocation.getCurrentPosition().then((resp) => {
      this.lng = resp.coords.longitude;
      this.lat = resp.coords.latitude;
      this.zoom = 15;
    })
  }

  ngOnInit() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.lng = resp.coords.longitude;
      this.lat = resp.coords.latitude;
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

  openFiltersModal() {
    let modal = Modal.create(FiltersModal);
    this.nav.present(modal);
  }

}
