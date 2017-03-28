import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResultsService } from '../results.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ResultsService]
})
export class SearchComponent implements OnInit {
  clickMessage : string;
  foundConctracts = [];
  private status: String = 'not ok';
  hitsCount: number = 0;
  constructor(private resultsService: ResultsService, private ref: ChangeDetectorRef) { }
  ngOnInit() {
  }

  onClickMe(text: string) {
    let promise = this.resultsService.search(text);
    
    promise.then( (result) => {
      console.log(result.hits.hits);
      this.foundConctracts = result.hits.hits;
      this.clickMessage = result.hits.total + "";
      this.ref.detectChanges();
    } );

  }

  onKey(event: any) { // without type info
    let promise = this.resultsService.search(event.target.value);
    
    promise.then( (result) => {
      console.log(result.hits.hits);
      this.foundConctracts = result.hits.hits;
      this.clickMessage = result.hits.total + "";
      this.ref.detectChanges();
    } );
  }

}
