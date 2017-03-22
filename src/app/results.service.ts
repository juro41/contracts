import { Injectable } from '@angular/core';
import * as elasticsearch from 'elasticsearch';


@Injectable()
export class ResultsService {
    private _client: elasticsearch.Client;
  constructor() { }

  getResults(input: string) : string {
this._client = new elasticsearch.Client({
            host: 'http://localhost:9200',
            log: 'trace'
        });
      return input;
  }
}
