import { HostListener, Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  @HostListener('window:scroll', ['$event'])
    track(event) {
        $("#back-to-top").css("opacity", 0 + ($(window).scrollTop()-200) / 100);
    }
}
