import {Page} from 'ionic-angular';
import {BicicleteriaMapaPage} from '../bicicleteria-mapa/bicicleteria-mapa';
import {BicicleteriaListPage} from '../bicicleteria-list/bicicleteria-list';
import { NavParams } from "ionic-angular/components/nav/nav-params";

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = BicicleteriaMapaPage;
  tab2Root: any = BicicleteriaListPage;
  myIndex: number;

  constructor(navParams: NavParams) {
    //this.myIndex = 0;
    //if (navParams.data.index) this.myIndex = navParams.data.index;
    this.myIndex = navParams.get('index');
  }
}
