import {Page} from 'ionic-angular';
import {HelloIonicPage} from '../hello-ionic/hello-ionic';
import {BicicleteriaListPage} from '../bicicleteria-list/bicicleteria-list';


@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  constructor() {

    this.tab1Root = HelloIonicPage;
    this.tab2Root = BicicleteriaListPage;
  }
}
