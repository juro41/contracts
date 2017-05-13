import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-attachment-window',
  templateUrl: './attachment-window.component.html',
  styleUrls: ['./attachment-window.component.scss']
})
export class AttachmentWindowComponent implements OnInit {

  @Input() attachmentLink;
  @Output()
  closeAtt:EventEmitter<string> = new EventEmitter();
  @ViewChild('attachment') att:ElementRef;


  constructor( ) { }

  ngOnInit() {
  }

  onCloseAttachmentClick() {
      this.closeAtt.emit('close');
  }

}
