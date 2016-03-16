import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
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

    findAll() {
        return this.http.get(bicicleteriasURL)
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
