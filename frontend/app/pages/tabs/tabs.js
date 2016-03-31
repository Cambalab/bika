import {Page, NavParams} from 'ionic-angular';
import {BicicleteriaMapaPage} from '../bicicleteria-mapa/bicicleteria-mapa';
import {BicicleteriaListPage} from '../bicicleteria-list/bicicleteria-list';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  static get parameters() {
    return [[NavParams]];
  }

  constructor(navParams) {

    this.myIndex = 0;
    if (navParams.data.index) this.myIndex = navParams.data.index;

    this.tab1Root = BicicleteriaMapaPage;
    this.tab2Root = BicicleteriaListPage;
  }
}
