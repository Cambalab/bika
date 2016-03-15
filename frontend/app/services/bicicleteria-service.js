import {Injectable} from 'angular2/core';
import {Http, Headers, RequestOptions} from 'angular2/http';
//import {SERVER_URL} from './config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

//let bicicleteriasURL = SERVER_URL + 'bicicleterias/';
let bicicleteriasURL = 'http://localhost:8000/' + 'bicicleterias/';

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
