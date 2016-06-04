import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Bicicleteria } from '../models/bicicleteria';
import { Observable } from "rxjs/Observable";
import { URLSearchParams } from "@angular/http/src/url_search_params";
import { RequestOptions } from "@angular/http/src/base_request_options";

@Injectable()
export class BicicleteriaService {
  private bicicleteriaURL = 'http://localhost:8000/bicicleterias/';  // URL to web api

  constructor(private http: Http) {
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
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

    return this.http.get(this.bicicleteriaURL, options)
        .map(res => res.json())
        .catch(this.handleError);
  }

  findById(id) {
    return this.http.get(this.bicicleteriaURL + id)
        .map(res => res.json())
        .catch(this.handleError);
  }

}
