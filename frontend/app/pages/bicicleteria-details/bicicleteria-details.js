import {Page, NavController, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/bicicleteria-details/bicicleteria-details.html'
})
export class BicicleteriaDetailsPage {

  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams, mostrarHorario) {

    //inicialmente el horario esta oculto
    var mostrarHorario = false;
    this.mostrarHorario = mostrarHorario;
    
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');
  }

  onPageDidEnter() {
    this.tabBarElement.style.display = 'none';
  }

  onPageWillLeave() {
    this.tabBarElement.style.display = 'block';
  }

  toggleHorario(){
    this.mostrarHorario = (this.mostrarHorario) ? false : true;
  }
}
