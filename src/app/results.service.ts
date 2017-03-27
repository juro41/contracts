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

  search(input: string) {
    console.log("search");
    return  this._client.search({
      q: input
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
