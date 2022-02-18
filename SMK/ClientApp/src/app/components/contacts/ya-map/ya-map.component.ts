import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {MapLoaderService} from 'src/app/services/map-loader.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-ya-map',
  templateUrl: './ya-map.component.html',
  styleUrls: ['./ya-map.component.scss']
})
export class YaMapComponent implements OnInit, OnDestroy {
  map: any;
  loading$: Subject<boolean>;
  ngUnsubscribe$: Subject<void>;

  constructor(
    private _mapLoaderService: MapLoaderService
  ) {
    this.loading$ = new Subject<boolean>();
    this.ngUnsubscribe$ = new Subject<void>();
  }

  ngOnInit() {
    this.loading$.next(true);
    this._mapLoaderService.getMap(
      'map',
      [56.007464232584,92.85972596336639]
    )
      .pipe(
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(map => {
        this.map = map;
        this.loading$.next(false);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }


}
