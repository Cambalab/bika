import {Page} from 'ionic-angular';
import {BicicleteriaMapaPage} from '../bicicleteria-mapa/bicicleteria-mapa';
import {BicicleteriaListPage} from '../bicicleteria-list/bicicleteria-list';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = BicicleteriaMapaPage;
  tab2Root: any = BicicleteriaListPage;
}
