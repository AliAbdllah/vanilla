import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WindowsSize } from '../enums/windowSize.enum';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  public static toCamel = (s) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  };

  public static isArray = (a) => {
    return Array.isArray(a);
  };

  public static isObject = (o) => {
    return (
      o === Object(o) && !UtilitiesService.isArray(o) && typeof o !== 'function'
    );
  };

  public static keysToCamel = (o) => {
    if (UtilitiesService.isObject(o)) {
      const n = {};

      Object.keys(o).forEach((k) => {
        n[UtilitiesService.toCamel(k)] = UtilitiesService.keysToCamel(o[k]);
      });

      return n;
    } else if (UtilitiesService.isArray(o)) {
      return o.map((i) => {
        return UtilitiesService.keysToCamel(i);
      });
    }

    return o;
  };

  public static convertResponseIntoArrays(json) {
    var arr: any[] = [];
    for (let index in json) {
      var obj = json[index];
      if (typeof obj == 'object') {
        let id = obj.id ? obj.id : null;
        obj = obj.attributes;
        obj.id = id;
      }
      arr.push(obj);
    }
    return arr;
  }

  public checkWindowsSize(document) {
    const windowsSize = document.defaultView?.innerWidth ?? 0;
    return windowsSize > WindowsSize.mobileSize ? false : true;
  }

  public static refactorCollections(json) {
    return UtilitiesService.keysToCamel(
      UtilitiesService.convertResponseIntoArrays(json)
    );
  }

  public sortData(data: any) {
    data.sort((a, b) => {
      const squenceA = Number(a.order);
      const squenceB = Number(b.order);
      if (squenceA < squenceB) return -1;
      if (squenceA > squenceB) return 1;
      return 0;
    });
    return data;
  }

  public static detectOperatingSystem(): string {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
    let os: string = '';

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
    return os;
  }

  public imageUrlResponse(data: any) {
    if (data?.data?.attributes?.url) {
      return environment.url + data?.data?.attributes?.url;
    }
    return '';
  }
  public fileUrlResponse(data: any) {
    if (data?.data?.attributes?.url) {
      return environment.url + data?.data?.attributes?.url;
    }
    return '';
  }
}
