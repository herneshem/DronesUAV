import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';

import * as L from 'leaflet';
import { Waypoint } from '../../../models/waypoint';
import { Telemetry } from '../../../models/telemetry';

@Component({
  selector: 'app-mission-map',
  imports: [],
  templateUrl: './mission-map.component.html',
  styles: ``
})
export class MissionMapComponent implements AfterViewInit, OnChanges {

  @Input() waypoints: Waypoint[] = [];

  @Output()
  telemetryChange = new EventEmitter<Telemetry>();

  private map!: L.Map;

  private droneMarker!: L.Marker;



  private moveDrone(
    from: Waypoint,
    to: Waypoint
  ): void {



    let progress = 0;

    const steps = 30;

    const interval = setInterval(() => {

      progress++;

      const lat =
        from.latitud +
        (to.latitud - from.latitud) * (progress / steps);

      const lng =
        from.longitud +
        (to.longitud - from.longitud) * (progress / steps);

      this.droneMarker.setLatLng([
        lat,
        lng
      ]);


      const telemetry: Telemetry = {
        latitud: lat,
        longitud: lng,
        altitud: to.altitud,
        velocidad: 15,
        bateria: 100,
        estado: 'En vuelo'
      };


      this.telemetryChange.emit(telemetry);
      if (progress >= steps) {
        clearInterval(interval);
      }



    }, 60);

  }
  private currentWaypoint = 0;

  private intervalId: any;

  ngAfterViewInit(): void {

    this.map = L.map('map');

    L.tileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);

    // Si los waypoints ya están disponibles
    this.addWaypoints();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['waypoints'] &&
      this.map
    ) {
      this.addWaypoints();
    }

  }

  private addWaypoints(): void {
    clearInterval(this.intervalId);
    this.currentWaypoint = 0;
    if (this.waypoints.length === 0) {
      return;
    }

    //Servirá para calcular automáticamente el área que ocupa la misión y centrar el mapa.
    const bounds = L.latLngBounds([]);
    //Guardará todas las coordenadas para dibujar la línea que une los waypoints.
    const route: L.LatLngExpression[] = [];

    this.waypoints.forEach(waypoint => {

      const position: L.LatLngExpression = [
        waypoint.latitud,
        waypoint.longitud
      ];

      // Marcador
      L.marker(position)
        .addTo(this.map)
        .bindPopup(`
          Latitud: ${waypoint.latitud}<br>
          Longitud: ${waypoint.longitud}<br>
          Altitud: ${waypoint.altitud} m
        `);

      // Añadir a la ruta
      route.push(position);

      // Añadir a los límites
      bounds.extend(position);

    });

    // Dibujar ruta
    L.polyline(route).addTo(this.map);

    // Centrar mapa
    this.map.fitBounds(bounds, {
      padding: [50, 50]
    });

    const firstWaypoint = this.waypoints[0];

    // Marcador del dron
    this.droneMarker = L.circleMarker(
      [firstWaypoint.latitud, firstWaypoint.longitud],
      {
        radius: 10,
        color: 'red',
        fillColor: 'red',
        fillOpacity: 1
      }
    ).addTo(this.map) as any;


    //Llama a la simulación del dron para que empiece a moverse por los waypoints
    //iNICIA AUTOMATICAMENTE
    //this.startSimulation();

  }


  //Empieza la simulación del dron
  private startSimulation(): void {


    this.intervalId = setInterval(() => {
      // Si la misión no está corriendo o está pausada, no hacemos nada (StartMission())
      if (!this.isRunning || this.isPaused) {
        return;
      }
      this.currentWaypoint++;

      if (this.currentWaypoint >= this.waypoints.length) {
        clearInterval(this.intervalId);
        return;
      }


      // PRIMERA SIMULACION HARCODEADO
      // const waypoint = this.waypoints[this.currentWaypoint];

      // this.droneMarker.setLatLng([
      //   waypoint.latitud,
      //   waypoint.longitud
      // ]);


      //SEGUNDA SIMULACIÓN CON DATOS HARCODEADOS, PERO CON MOVIMIENTO SUAVE ENTRE WAYPOINTS
      const from = this.waypoints[this.currentWaypoint - 1];
      const to = this.waypoints[this.currentWaypoint];

      this.moveDrone(from, to);
    }, 3000);

  }


  // AÑADIMOS ESTADOS DEL DRON PARA CONTROLAR LA SIMULACIÓN DE LA MISIÓN
  //LOS METODOS SE PONENN PUBLICOS PARA QUE LO COJA EL COMPONENTE PADRE (MISSION-DETAIL) Y PUEDA CONTROLAR LA SIMULACIÓN DE LA MISIÓN

  private isRunning = false;
  private isPaused = false;

  public startMission(): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.isPaused = false;

     this.startSimulation();
  }

  public pauseMission(): void {
    this.isPaused = true;
  }

  public stopMission(): void {
    this.isRunning = false;
    this.isPaused = false;

    clearInterval(this.intervalId);
    this.currentWaypoint = 0;
  }

  public restartMission(): void {
    this.stopMission();

    this.currentWaypoint = 0;

    const first = this.waypoints[0];

    this.droneMarker.setLatLng([
      first.latitud,
      first.longitud
    ]);

    this.startMission();



  }
}