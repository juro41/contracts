import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResultsService } from '../results.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ResultsService]
})
export class SearchComponent implements OnInit {
  clickMessage: string;
  foundConctracts = [];
  private status: String = 'not ok';
  hitsCount: number = 0;
  showPaginator: boolean = true;
  shift: number = 0;
  size: number = 5;
  expression: string;
  constructor(private resultsService: ResultsService, private ref: ChangeDetectorRef) { }
  ngOnInit() {
  }

  onSimpleSearchClick(text: string) {
    this.shift = 0;
    this.getData(text, this.size, 0);
  }

  onKeyText(event: any) { // without type info
    this.shift = 0;
    this.expression = event.target.value;
    this.getData(this.expression, this.size, 0);
  }

  getNextPage() {
    console.log(this.shift + this.size);
    if((this.shift + this.size) < this.hitsCount) {
      this.shift += this.size;
    }
    this.getData(this.expression, this.size, this.shift);
  }

  getPreviousPage() {
    if((this.shift - this.size) >= 0) {
      this.shift -= this.size;
    }
    this.getData(this.expression, this.size, this.shift);
  }

  getData(text, size, shift){
    let promise = this.resultsService.search(text, size, shift);
    promise.then((result) => {
      this.foundConctracts = result.hits.hits;
      this.hitsCount = result.hits.total
      this.clickMessage = this.hitsCount + "";
      console.log(this.hitsCount);
      this.ref.detectChanges();
    });
  }

  onAdvancedSearchClick(text: string, icoCustomer: string, icoSupplier: string) {
    this.shift = 0;
    console.log(icoCustomer);
    this.getDataAdvanced(text, icoCustomer, icoSupplier, this.size, 0);
  }

  getDataAdvanced(text, icoCustomer, icoSupplier, size,shift) {
    let promise = this.resultsService.advancedSearch(text, icoCustomer,icoSupplier, size, shift);
    promise.then((result) => {
      this.foundConctracts = result.hits.hits;
      this.hitsCount = result.hits.total
      this.clickMessage = this.hitsCount + "";
      console.log(this.hitsCount);
      this.ref.detectChanges();
    });
  }

}
