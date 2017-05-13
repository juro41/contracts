import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';
import * as $ from 'jquery';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {

  constructor(private http: Http) {
  }

  advancedSearch(nameContract: string, icoCustomer: string, nameCustomer: string, icoSupplier: string, nameSupplier: string, size: number, shift: number, asc: boolean) {

    var direction = "asc";
    if (asc == false) {
      direction = "desc"
    }

    var data = { 
      nameContract: nameContract,
      icoCustomer: icoCustomer,
      nameCustomer: nameCustomer,
      icoSupplier: icoSupplier,
      nameSupplier: nameSupplier,
      size: size,
      shift: shift,
      direction: direction
    };

    var queryF = [];
    if (nameContract != "") queryF.push({ prefix: { "title": nameContract } });
    if (icoCustomer != "") queryF.push({ wildcard: { "customer.ico": icoCustomer } });
    if (nameCustomer != "") queryF.push({ wildcard: { "customer.name": nameCustomer.toLocaleLowerCase() } });
    if (icoSupplier != "") queryF.push({ wildcard: { "supplier.ico": icoSupplier } });
    if (nameSupplier != "") queryF.push({ wildcard: { "supplier.name": nameSupplier } });

    let options = new RequestOptions({
      body: JSON.stringify(data)
    });

    return this.http.post('/search/adv', options)
      .map(res => res.json());


  }

  search(expression: string, size: number, shift: number, asc: boolean) {

    var direction = "asc";
    if (asc == false) {
      direction = "desc"
    }

    let data = {
      expression: expression,
      size: size,
      shift: shift,
      direction: direction
    };

    let options = new RequestOptions({
      body: JSON.stringify(data)
    });
    return this.http.post('/search/sim', options)
      .map(res => res.json());
  }

/*  _connect() {
    this._client = new Client({
      host: 'http://localhost:9200'
    });
  };

  isAvailable() {
    this._client.ping({
      requestTimeout: 1000
    }, function (error) {
      if (error) {
        console.trace('elasticsearch cluster is down!');
      } else {
        console.log('All is well');
      }
    });
  };

*/

}
