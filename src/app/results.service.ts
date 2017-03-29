import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';
import * as $ from 'jquery';


@Injectable()
export class ResultsService {

  private _client: Client;


  constructor() {
    if (!this._client) {
      this._connect();
    }
  }

  advancedSearch(expression: string, icoCustomer: string, icoSupplier: string, size: number, shift: number) {
    console.log("search" + icoCustomer);
    return this._client.search({
      body: {
        query: {
          bool: {
            should: [
              { match: { "customer.ico": icoCustomer } },
              { match: { "supplier.ico": icoSupplier } }
            ]
          }
        }
      },
      size: size,
      from: shift
    });
  }

  search(expression: string, size: number, shift: number) {
    console.log("search");
    return this._client.search({
      q: expression,
      size: size,
      from: shift
    });
  }



  private _connect() {
    this._client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
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
  }


}
