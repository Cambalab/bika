import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {BicicleteriaListPage} from './pages/bicicleteria-list/bicicleteria-list';
import {BicicleteriaService} from './services/bicicleteria-service';

@App({
  templateUrl: 'build/app.html',
  config: {
    serverURL: "http://localhost:8000"
  },
  providers: [BicicleteriaService]
})

class MyApp {
  static get parameters() {
    return [[IonicApp], [Platform], [MenuController]];
  }

  constructor(app, platform, menu) {
    // set up our app
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'Bicicleterias', component: BicicleteriaListPage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = BicicleteriaListPage;
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

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
