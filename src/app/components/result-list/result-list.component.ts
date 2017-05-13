import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit {

  @Input() foundConctracts = {};
  @Input() hitsCount: number;

  @Output()
  sort: EventEmitter<string> = new EventEmitter();

  attachmentLink;
  isVisible: boolean = false;


  constructor(private ref: ChangeDetectorRef, private sanitizer: DomSanitizer, ) { }

  ngOnInit() {
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

  sortByValueClick() {
    this.sort.emit('sort');
  }

  onAttachmentClick(event: any) {
    console.log(event);
    this.isVisible = !this.isVisible;
    if (this.isVisible)
      this.attachmentLink = this.sanitizer.bypassSecurityTrustResourceUrl("https://docs.google.com/gview?embedded=true&url=" + event);
    this.ref.detectChanges();
  }

}
