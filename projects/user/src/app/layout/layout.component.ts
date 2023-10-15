import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  'language': string;
  constructor(private translate: TranslateService) {
    this.language = this.translate.currentLang;
  }
  changeLanguage() {
    if (this.language === 'en') {
      localStorage.setItem('language', 'ar');
    } else {
      localStorage.setItem('language', 'en');
    }
    window.location.reload();
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
