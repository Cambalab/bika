import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {BicicleteriaMapaPage} from './pages/bicicleteria-mapa/bicicleteria-mapa';
import {BicicleteriaListPage} from './pages/bicicleteria-list/bicicleteria-list';
import {TabsPage} from './pages/tabs/tabs';
import {BicicleteriaService} from './services/bicicleteria-service';
import {Geolocation} from 'ionic-native';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

@App({
  templateUrl: 'build/app.html',
  config: {
    tabbarPlacement:'top'
  },
  providers: [BicicleteriaService, ANGULAR2_GOOGLE_MAPS_PROVIDERS]
})

class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [MenuController]];
  }

  constructor(app, platform, menu) {
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Bicicleterias', component: TabsPage, index: 0, icon: 'contacts' },
      { title: 'Mapa', component: TabsPage, index: 1, icon: 'calendar' }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = TabsPage;
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component, { index: page.index });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      //
      // For example, we might change the StatusBar color. This one below is
      // good for light backgrounds and dark text;
      if (window.StatusBar) {
        window.StatusBar.styleDefault();
      }
    });
  }

}
