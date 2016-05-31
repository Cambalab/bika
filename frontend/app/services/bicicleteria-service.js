import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {API_BASE_URL} from './settings';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

let bicicleteriasURL = API_BASE_URL + 'bicicleterias/';

@Injectable()
export class BicicleteriaService {

    static get parameters(){
      return [[Http]];
    }

    constructor (http) {
        this.http = http;
    }

    findNear(lng, lat) {
      let params = new URLSearchParams();
      params.set('lng', lng);
      params.set('lat', lat);

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({
          headers: headers,
          search: params
      });

      return this.http.get(bicicleteriasURL, options)
          .map(res => res.json())
          .catch(this.handleError);
    }

    findById(id) {
        return this.http.get(this.bicicleteriasURL + id)
            .map(res => res.json())
            .catch(this.handleError);
    }

    handleError(error) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
