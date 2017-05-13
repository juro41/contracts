import { ViewChild, ElementRef, Component, OnInit, ChangeDetectorRef, Inject, animate, transition, trigger, state, style, Input } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [SearchService]
})

export class SearchInputComponent implements OnInit {
  @ViewChild('text') input: ElementRef;
  @ViewChild('scrollButton') scrollButton: ElementRef;

  hitsCountStr: string;
  foundConctracts = [];
  hitsCount: number = 0;
  showPaginator: boolean = true;
  shift: number = 0;
  size: number = 10;
  expression: string;
  loadedContractsCount: number = 0;
  advanced: boolean = false;
  advancedSearchArr = [];
  attachmentLink: string;
  isVisible: boolean = false;
  asc: boolean = true;
  @ViewChild('attachment') att:ElementRef;

  constructor(private searchService: SearchService, private ref: ChangeDetectorRef) { }
  ngOnInit() {
  }

  onSimpleSearchClick(text: string) {
    this.shift = 0;
    this.getData(text, this.size, 0);
  }

  

  onKeyText(event: any) { // without type info
    this.shift = 0;
    this.loadedContractsCount = 0;
    this.expression = event.target.value;
    this.foundConctracts = [];
    this.asc = false;
    this.getData(this.expression, this.size, 0);
    this.advanced = false;
  }

  getData(text, size, shift) {

    this.searchService.search(text, size, shift, this.asc).subscribe( posts => {
      if (this.foundConctracts.length > 0)
        this.foundConctracts = this.foundConctracts.concat(posts.hits.hits);
      else
        this.foundConctracts = posts.hits.hits;
      this.hitsCount = posts.hits.total
      this.hitsCountStr = this.hitsCount + "";
      this.loadedContractsCount = this.loadedContractsCount + this.size;
    });

  }

  onAdvancedSearchClick(nameContract: string, icoCustomer: string, nameCustomer: string, icoSupplier: string, nameSupplier: string) {
    this.shift = 0;
    this.loadedContractsCount = 0;
    this.advanced = true;
    this.foundConctracts = [];
    this.asc = false;
    this.advancedSearchArr = [nameContract, icoCustomer, nameCustomer, icoSupplier, nameSupplier];
    this.getDataAdvanced(nameContract, icoCustomer, nameCustomer, icoSupplier, nameSupplier, this.size, 0);
  }

  getDataAdvanced(nameContract, icoCustomer, nameCustomer, icoSupplier, nameSupplier, size, shift) {
    console.log(this.advancedSearchArr);

    this.searchService.advancedSearch(nameContract, icoCustomer, nameCustomer, icoSupplier, nameSupplier, size, shift, this.asc).subscribe( posts => {
      if (this.foundConctracts.length > 0)
        this.foundConctracts = this.foundConctracts.concat(posts.hits.hits);
      else
        this.foundConctracts = posts.hits.hits;
      this.hitsCount = posts.hits.total
      this.hitsCountStr = this.hitsCount + "";
      this.loadedContractsCount = this.loadedContractsCount + this.size;
    });
  }

  searchByCustomer ( event ) {
    
    this.advancedSearchArr[1] = event.target.text;
    console.log(event.target.text);
    this.foundConctracts = [];
    this.asc = false;
    this.getDataAdvanced("", "", event.target.text, "", "", this.size, this.shift);

  }


  loadMore() {
    if ((this.shift + this.size) < this.hitsCount) {
      this.shift += this.size;
      if (this.advanced) {
        this.getDataAdvanced(this.advancedSearchArr[0], this.advancedSearchArr[1], this.advancedSearchArr[2], this.advancedSearchArr[3], this.advancedSearchArr[4], this.size, this.shift);
      }
      else {
        this.getData(this.expression, this.size, this.shift);
      }

    }
  }


  sortByValueClick() {
    this.asc = !this.asc;
    this.shift = 0;
    this.foundConctracts = [];
    
    if (this.advanced) {
        this.getDataAdvanced(this.advancedSearchArr[0], this.advancedSearchArr[1], this.advancedSearchArr[2], this.advancedSearchArr[3], this.advancedSearchArr[4], this.size, this.shift);
      }
      else {
        this.getData(this.expression, this.size, this.shift);
    }

  }



}
