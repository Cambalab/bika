import {Page, Modal, NavController, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/modal-filters/modal-filters.html'
})

export class FiltersModal {

  constructor(private viewCtrl : ViewController) {
    this.viewCtrl = viewCtrl;
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
