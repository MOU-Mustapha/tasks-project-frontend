import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'admin';
  'language': any;
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.language = localStorage.getItem('language');
    this.translate.use(this.language || this.translate.defaultLang);
  }
}
