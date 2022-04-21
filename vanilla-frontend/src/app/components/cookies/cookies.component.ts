import { Component, Input, OnInit } from '@angular/core';
import { CookiesEnum } from 'src/app/enums/cookies.enum';
import { CookiesService } from 'src/app/service/cookies.service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss'],
})
export class CookiesComponent implements OnInit {
  @Input() showCookies = false;
  constructor(private cookiesService: CookiesService) {}

  ngOnInit() {}

  public acceptCookies(): void {
    this.cookiesService.setItem(CookiesEnum.cookiesSettings, {
      preferencesToggle: true,
      statisticsToggle: true,
    });
    this.showCookies = false;
  }
}
