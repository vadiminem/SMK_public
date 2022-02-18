import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

declare var ymaps:any;

@Injectable({
  providedIn: 'root'
})
export class MapLoaderService {

  map$: Subject<any>;

  constructor() {
    this.map$ = new Subject<any>();
  }

  getMap(element: string, coords: number[]): Observable<any> {
    const scriptYmaps = document.createElement('script');
    scriptYmaps.src = 'https://api-maps.yandex.ru/2.1/?apikey=da7e5734-e58f-46d9-8e1e-5aa4799d31eb&lang=ru_RU';
    document.body.appendChild(scriptYmaps);
    const createMap = () => {
      const map = new ymaps.Map(
        element,
        {
          center: coords,
          zoom: 15
        }
      );
      map.geoObjects.add(new ymaps.Placemark([56.00747491333291,92.8597083134918], {
        balloonContent: 'г. Красноярск, ул. Диктатуры Пролетариата, д. 6'
      }, {
        preset: 'islands#icon',
        iconColor: '#FF5733'
      }));
    }
    scriptYmaps.onload = function () {
      ymaps.ready(createMap);
    }

    return this.map$;
  }
}
