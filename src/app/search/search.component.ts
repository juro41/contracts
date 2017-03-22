import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../results.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ResultsService]
})
export class SearchComponent implements OnInit {
  clickMessage = '';

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
  }

  onClickMe(text: string) {
    this.clickMessage = this.resultsService.getResults(text);
  }

}
