import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { environment } from '../../environments/environment';
import { ApiService } from './api.service';
export interface SEOResponse {
  pageTitle?: string;
  abstract?: string;
  description?: string;
  keywords?: string;
  googleNewsKeywords?: string;
  image?: any;
  shortLinkUrl?: string;
}
export interface PageCMS {
  url: string;
  seo?: SEOResponse;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  pageCMS = [];
  defaultDescription = `defaultDescription`;
  defaultKeywords = `defaultKeywords`;
  defaultTitle = 'defaultTitle';
  constructor(
    @Inject(DOCUMENT) private dom: any,
    private titleService: Title,
    private metaService: Meta,
    private _apiService: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  setCanonicalURL() {
    const canonicalUrl = environment.websiteUrl + this.router.url;
    console.log(canonicalUrl);
    var element: HTMLLinkElement =
      this.dom.querySelector(`link[rel='canonical']`) || null;
    if (element == null) {
      const link: HTMLLinkElement = this.dom.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalUrl);
      this.dom.head.appendChild(link);
    } else {
      element.setAttribute('rel', 'canonical');
      element.setAttribute('href', canonicalUrl);
    }
  }
  public init(): void {
    this.default();
    this.getSeoData().subscribe((res) => {
      this.pageCMS = res;
      if (!this.router.url.includes('/products/')) {
        const url = this.router.url.split('/')[1];
        const page = this.findPage(url);
        const home = this.findPage('home');
        if (page && url) {
          this.handle(page);
        } else if (home) {
          this.defaultDescription = home.description;
          this.defaultKeywords = home.keywords;
          this.defaultTitle = home.pageTitle;
          this.setTitle(home.pageTitle);
          this.setDescribtion(home.description);
          this.setKeyWords(home.keywords);
        }
      }
    });
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        !this.router.url.includes('/products/')
      ) {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        let url = this.router.url;
        if (url.startsWith('/')) {
          url = url.substring(1);
          if (url.includes('/')) {
            url = url.split('/')[1];
          }
        }
        const page = this.findPage(url);
        if (page) {
          this.handle(page);
        } else if (url == '') {
          const home = this.findPage('home');
          this.handle(home);
        }
      }
    });
  }

  public getSeoData(): Observable<PageCMS[]> {
    const query = this._apiService.qsParams({
      seo: {
        populate: '*',
      },
    });

    return this._apiService.get<any>('pages', query).pipe(
      map((response) => {
        const res = [];
        for (const entry of response.data) {
          res.push(entry.attributes);
        }
        return res;
      })
    );
  }

  public default(): void {
    this.titleService.setTitle(this.defaultTitle);
    this.setDescribtion(this.defaultDescription);
    this.setKeyWords(this.defaultDescription);
  }

  public handle(seo: SEOResponse): void {
    if (seo?.pageTitle || seo?.description) {
      this.setCanonicalURL();
      this.setTitle(seo?.pageTitle);
      this.setDescribtion(seo?.description);
      this.setKeyWords(seo?.keywords);
    }
  }

  public setTitle(title: string): void {
    if (title) {
      this.titleService.setTitle(title);
    } else {
      this.titleService.setTitle(this.defaultTitle);
    }
  }
  public setKeyWords(keywords: string): void {
    if (keywords) {
      this.metaService.updateTag(
        { name: 'keywords', content: keywords },
        'name="keywords"'
      );
    } else {
      this.metaService.updateTag(
        { name: 'keywords', content: this.defaultKeywords },
        'name="keywords"'
      );
    }
  }
  public setDescribtion(description: string): void {
    if (description) {
      this.metaService.updateTag(
        { name: 'description', content: description },
        'name="description"'
      );
    } else {
      this.metaService.updateTag(
        { name: 'description', content: this.defaultDescription },
        'name="description"'
      );
    }
  }
  public findPage(url: string): SEOResponse {
    let page;
    if (this.pageCMS.length > 0) {
      page = this.pageCMS.find((p) => {
        return p.url.trim() === url;
      });
      // if (!page) {
      //   return {
      //     description: this.defaultDescription,
      //     pageTitle: this.defaultTitle,
      //     keywords: this.defaultKeywords,
      //   };
      // }
    }
    return page?.seo;
  }
}
