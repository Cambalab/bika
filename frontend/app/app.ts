import { App, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './pages/tabs/tabs';
import { BicicleteriaService } from './services/bicicleteria.service';

@App({
  /* templateUrl: 'build/app.html', */
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {},
  providers: [ BicicleteriaService ]
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
