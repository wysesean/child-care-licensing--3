import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
// MAP
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as _ from 'lodash';
// MODELS
// COMPONENTS
// SERVICES
// UTILS & OTHER
import { suppressTileErrors } from '../utils';
import { BehaviorSubject } from 'rxjs';
import { GeoJSONSource } from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { mapControl, MAP_CONSTS } from '../models';

@Directive({
  selector: '[appMap]'
})
export class MapDirective implements OnInit, OnChanges {
  @HostBinding('class.app-map') cssClass = true;
  private _map: mapboxgl.Map; // main map
  private _styleLoad = false; // whether map style is loaded

  @Input() mapControls: mapControl[] = []; // configurable array of controls, executed by use of controls enum and mapCommander
  @Input() filteredIds: string[];
  @Output() featureClick = new EventEmitter();
  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    this.typeSafe(mapboxgl).accessToken = environment.MAPBOX_KEY;

    this._map = new mapboxgl.Map({
      ...MAP_CONSTS.HOME_LOCATION,
      container: this._elementRef.nativeElement,
      attributionControl: true,
      style: 'mapbox://styles/wysesean/cjheex5wz035e2slnhi0rqgpd'
    });

    const mapControlCommander: { [c in mapControl]: Function } = {
      home: () => this._addHomeControl(this._map),
      nav: () => this._addNavControl(this._map),
      geolocate: () => this._addGeolocateControl(this._map),
      pointer: () => this._addCursorPointer(this._map),
      geocoder: () => this._addGeocoder(this._map),
      featureClick: () => this._addFeatureClick(this._map)
    };

    this._map.on('style.load', () => {
      const styles = this._map.getStyle();
      if (this.mapControls.length) {
        Object.keys(mapControlCommander).forEach(ctrl => {
          if (_.includes(this.mapControls, ctrl)) {
            _.invoke(mapControlCommander, ctrl);
          }
        });
      }
      this._styleLoad = true;
    });

    this._map.on('error', suppressTileErrors);
    setTimeout(() => this._map.resize(), 0);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this._map || !this._styleLoad) {
      return;
    }
    if (changes.filteredIds) {
     console.log('apply filter', changes.filteredIds.currentValue);
      this.applyFiltered(changes.filteredIds.currentValue);
    }
  }

  // -----------------CONTROLS -----------------
  /** Add home control */
  private _addHomeControl(map: mapboxgl.Map) {
    // map.addControl(new HomeControl(MAP_CONSTS.HOME_LOCATION), 'top-left');
  }

  /** Add navigation control (zoom and compass) */
  private _addNavControl(map: mapboxgl.Map) {
    const navControl = new mapboxgl.NavigationControl();
    // Default behavior just sets bearing. We want to reset pitch also.
    this.typeSafe(navControl)._compass.addEventListener('click', evt => map.flyTo({ pitch: 0, bearing: 0 }));
    map.addControl(navControl, 'bottom-right');
  }

  // Add geolocation control (show user's current location)
  private _addGeolocateControl(map: mapboxgl.Map) {
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      }),
      'bottom-right'
    );
  }
  // Adds geocoder control
  private _addGeocoder(map: mapboxgl.Map) {
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
      }),
      'top-left'
    );
  }

  private applyFiltered(filteredIds: string[]) {
    this._map.setFilter(MAP_CONSTS.MAP_SITES_SYMBOLS, ['in', 'OPERATION_ID', ...filteredIds]);

  }

  // ----------------- MOUSE HOVER CURSOR -----------------
  /** Add mouse hover event: `Cursor Pointer` */
  private _addCursorPointer(map: mapboxgl.Map) {
    map.on('mouseenter', MAP_CONSTS.MAP_SITES_SYMBOLS, e => (e.target.getCanvas().style.cursor = 'pointer'));
    map.on('mouseleave', MAP_CONSTS.MAP_SITES_SYMBOLS, e => (e.target.getCanvas().style.cursor = ''));
  }

  private _addFeatureClick(map: mapboxgl.Map) {
    map.on('click', evt => {
      const feats = this._map.queryRenderedFeatures(evt.point, { layers: [MAP_CONSTS.MAP_SITES_SYMBOLS] });
      if (feats && feats.length > 0 && feats[0].properties) {
        this.featureClick.emit(feats[0].properties);
      }
    });
  }
  /** Adjust the Mapbox to the container size. */
  public resize() {
    this._map && this._map.resize();
  }

  /** Returns input as type `any` */
  private typeSafe<T>(item: T): any {
    return <any>item;
  }
}
