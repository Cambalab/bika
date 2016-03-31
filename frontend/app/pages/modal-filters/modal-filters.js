import {Page, Modal, NavController, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/modal-filters/modal-filters.html'
})

export class FiltersModal {

  static get parameters() {
    return [[ViewController]];
  }

  constructor(viewCtrl) {
    this.viewCtrl = viewCtrl;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
