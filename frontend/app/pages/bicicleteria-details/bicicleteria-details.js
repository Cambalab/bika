import {Page, NavController, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/bicicleteria-details/bicicleteria-details.html'
})
export class BicicleteriaDetailsPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
