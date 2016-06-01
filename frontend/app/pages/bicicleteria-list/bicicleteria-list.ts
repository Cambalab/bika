import {Page} from 'ionic-angular';
import { Bicicleteria } from '../models/bicicleteria';

@Page({
  templateUrl: 'build/pages/bicicleteria-list/bicicleteria-list.html',
})
export class BicicleteriaListPage {
  bicicleterias: Bicicleteria[];

  constructor(private bicicleteriaService: BicicleteriaService) {}

  ngOnInit() {
    this.getBicicleterias();
  }

  getBicicleterias() {
    this.bicicleteriaService.getBicicleterias().subscribe(data => this.bicicleterias = data);
  }
}
