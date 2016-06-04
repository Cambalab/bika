import { App, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import { BicicleteriaService } from './services/bicicleteria-service';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import { MenuController } from "ionic-angular/components/menu/menu-controller";
import { IonicApp } from "ionic-angular/components/app/app";
import { ViewChild } from "@angular/core/src/metadata";
import { Nav } from "ionic-angular/components/nav/nav";

@App({
  templateUrl: 'build/app.html',
  config: {
    tabbarPlacement:'top'
  },
  providers: [ BicicleteriaService, ANGULAR2_GOOGLE_MAPS_PROVIDERS]
})
export class MyApp {
  rootPage: any = TabsPage;
  @ViewChild(Nav) nav: Nav;

  pages: any = [
    { title: 'Bicicleterias', component: TabsPage, index: 0, icon: 'contacts' },
    { title: 'Mapa', component: TabsPage, index: 1, icon: 'calendar' }
  ];

  constructor(platform: Platform, private menu: MenuController, private app: IonicApp) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page

    this.nav.push(page.component, { index: page.index });
  }
}
