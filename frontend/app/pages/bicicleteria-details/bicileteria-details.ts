import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/bicicleteria-details/bicicleteria-details.html'
})
export class BicicleteriaDetailsPage {

  mostrarHorario: Boolean;
  selectedItem: any;
  tabBarElement: any;

  constructor(private nav : NavController , navParams: NavParams) {

    //inicialmente el horario esta oculto
    this.mostrarHorario = false;

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
