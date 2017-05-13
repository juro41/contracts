import { Component, OnInit, Inject, HostListener} from '@angular/core';
import { PageScrollService, PageScrollInstance } from 'ng2-page-scroll';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-scroll-on-top',
  templateUrl: './scroll-on-top.component.html',
  styleUrls: ['./scroll-on-top.component.scss']
})
export class ScrollOnTopComponent implements OnInit {

  constructor(private pageScrollService: PageScrollService, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  public scrollOnTop(): void {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({ document: this.document, scrollTarget: "#header", pageScrollDuration: 500 });
    this.pageScrollService.start(pageScrollInstance);

  }

    @HostListener('window:scroll', ['$event'])
    track(event) {
        $("#back-to-top").css("opacity", 0 + ($(window).scrollTop()-200) / 100);
    }
}
