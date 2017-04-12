import { ViewChild, ElementRef, Component, OnInit, ChangeDetectorRef, Inject, animate, transition, trigger, state, style } from '@angular/core';
import { ResultsService } from '../results.service';
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [ResultsService],
  animations: [
    trigger('enterAnimation', [
      state('shown', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('shown => hidden', animate('600ms')),
      transition('hidden => shown', animate('300ms')),
    ])]
})
export class SearchComponent implements OnInit {
  @ViewChild('text') input: ElementRef;
  @ViewChild('scrollButton') scrollButton: ElementRef;

  clickMessage: string;
  foundConctracts = [];
  hitsCount: number = 0;
  showPaginator: boolean = true;
  shift: number = 0;
  size: number = 10;
  expression: string;
  test: string = '#awesomePart';
  loadedContractsCount: number = 0;
  goto: number = 10;


  constructor(private resultsService: ResultsService, private ref: ChangeDetectorRef, private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) { }
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
    this.getData(this.expression, this.size, 0);
  }

  /*  getNextPage() {
      console.log(this.shift + this.size);
      if ((this.shift + this.size) < this.hitsCount) {
        this.shift += this.size;
      }
      this.getData(this.expression, this.size, this.shift);
    }
  
    getPreviousPage() {
      if ((this.shift - this.size) >= 0) {
        this.shift -= this.size;
      }
      this.getData(this.expression, this.size, this.shift);
    }
  */
  getData(text, size, shift) {
    let promise = this.resultsService.search(text, size, shift);
    promise.then((result) => {
      if (this.foundConctracts.length > 0)
        this.foundConctracts = this.foundConctracts.concat(result.hits.hits);
      else
        this.foundConctracts = result.hits.hits;
      this.hitsCount = result.hits.total
      this.clickMessage = this.hitsCount + "";
      this.loadedContractsCount = this.loadedContractsCount + this.size;
     
      this.ref.detectChanges();
    });
  }

  onAdvancedSearchClick(text: string, icoCustomer: string, icoSupplier: string) {
    this.shift = 0;
    // console.log(icoCustomer);
    this.getDataAdvanced(text, icoCustomer, icoSupplier, this.size, 0);
  }

  getDataAdvanced(text, icoCustomer, icoSupplier, size, shift) {
    let promise = this.resultsService.advancedSearch(text, icoCustomer, icoSupplier, size, shift);
    promise.then((result) => {
      this.foundConctracts = result.hits.hits;
      this.hitsCount = result.hits.total
      this.clickMessage = this.hitsCount + "";


      this.ref.detectChanges();
    });
  }

/*  onScroll() {
    console.log('scrolled!!' + this.expression);
    this.shift += this.size;
    this.getData(this.expression, this.size, this.shift);
  }*/

  loadMore() {
    if ((this.shift + this.size) < this.hitsCount) {
      this.shift += this.size;
      // console.log('load more!!' + this.expression + " " + this.hitsCount + " " + this.shift);
      this.getData(this.expression, this.size, this.shift);
    }
  }

  onTop() {
    window.scrollTo(0, 0);
  }

  public goToHead2(): void {
/*    console.log($(document).scrollTop());
    console.log($("#contract0").offset().top);
    let scrollTarget;

    //todo
    //porovnat s najblizsou vyssou strankou 
    if ($("#contract" + (this.loadedContractsCount - 1)).offset().top < $(document).scrollTop()) {
      scrollTarget = "#contract" + this.goto;
    } else {
      scrollTarget = "#header";
    }*/
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({ document: this.document, scrollTarget: "#header", pageScrollDuration: 500 });
    this.pageScrollService.start(pageScrollInstance);

  }

  showDetail(event: any) {
    let target = "#" + event.target.value;
    if ($(target).css("lineHeight") == "0px") {
      $(target).css({ "display": "table-row" });
      $(target).animate({ lineHeight: "35px" });
    } else {
      $(target).animate({ lineHeight: "0px" }, function () {
        $(target).css({ "display": "none" });
      });
    }
  }
  /*  trackByFn(index, item){
      console.log(item);
      console.log(index);
    }*/
}
