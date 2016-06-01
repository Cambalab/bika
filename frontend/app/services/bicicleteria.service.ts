import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Bicicleteria } from '../models/bicicleteria';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BicicleteriaService {
  private bicicleteriaUrl = 'http://localhost:8000/bicicleterias/';  // URL to web api

  constructor(private http: Http) { }

  getBicicleteria(id: number) {
    return this.getBicicleterias()
               .then(bicicleterias => bicicleterias.filter(bicicleteria => bicicleteria.id === id)[0]);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getBicicleterias(): Promise<Bicicleteria[]> {
    return this.http.get(this.bicicleteriaUrl)
               .toPromise()
               .then(response => response.json().data)
               .catch(this.handleError);
  }
}
