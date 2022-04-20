import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  constructor(private CookieService: CookieService) {}
  public setItem(key: string, val: any | string): void {
    if (typeof val === 'object') {
      this.CookieService.set(key, JSON.stringify(val));
    } else {
      this.CookieService.set(key, val);
    }
  }
  public getItem(key: string): any {
    try {
      return JSON.parse(this.CookieService.get(key));
    } catch (e) {
      return this.CookieService.get(key);
    }
  }

  public deleteItem(key: string): void {
    this.CookieService.delete(key);
  }

  public clearAll(): void {
    const cookiesSettings = JSON.parse(
      this.CookieService.get('cookies-settings')
    );
    this.CookieService.deleteAll();
    localStorage.setItem('cookies-settings', JSON.stringify(cookiesSettings));
  }
}
