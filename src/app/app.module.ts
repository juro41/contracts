import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { AppComponent } from './app.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ValuePipe } from './pipes/value/value.pipe';
import { LongTextPipe } from './pipes/long-text/long-text.pipe';
import { ScrollOnTopComponent } from './components/scroll-on-top/scroll-on-top.component';
import { DetailComponent } from './components/detail/detail.component';
import { AttachmentWindowComponent } from './components/attachment-window/attachment-window.component';


@NgModule({
  declarations: [
    AppComponent,
    ResultListComponent,
    SearchInputComponent,
    ValuePipe,
    LongTextPipe,
    PdfViewerComponent,
    ScrollOnTopComponent,
    DetailComponent,
    AttachmentWindowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InfiniteScrollModule,
    Ng2PageScrollModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
