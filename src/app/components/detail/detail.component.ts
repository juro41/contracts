import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  
  @Input() contract;
  @Input() i: number;

  @Output()
  detail:EventEmitter<string> = new EventEmitter();

  ngOnInit() {
  }

  onAttachmentClick(event){
    this.detail.emit(event.target.title);
  }


}
