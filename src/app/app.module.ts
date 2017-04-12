import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

import { AppComponent } from './app.component';
import { ResultListComponent } from './result-list/result-list.component';
import { SearchComponent } from './search/search.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ValuePipe } from './value.pipe';
import { LongTextPipe } from './long-text.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ResultListComponent,
    SearchComponent,
    PaginatorComponent,
    ValuePipe,
    LongTextPipe,
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
