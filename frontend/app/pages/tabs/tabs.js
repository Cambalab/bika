import {Page, NavParams} from 'ionic-angular';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
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

    this.tab1Root = HelloIonicPage;
    this.tab2Root = BicicleteriaListPage;
  }
}
