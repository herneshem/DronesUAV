import { Component, OnInit } from '@angular/core';
import { Mission } from '../../models/mission';
import { Waypoint } from '../../models/waypoint';
import { MissionService } from '../../core/services/mission.service';
import { WaypointService } from '../../core/services/waypoint.service';
import { WaypointCardComponent } from '../../shared/components/waypoint-card/waypoint-card.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MissionMapComponent } from "../../shared/components/mission-map/mission-map.component";
import { TelemetryCardComponent } from "../../shared/components/telemetry-card/telemetry-card.component";
import { Telemetry } from '../../models/telemetry';
import { ViewChild } from '@angular/core';
import { WebSocketServiceService } from '../../core/services/web-socket-service';

@Component({
  selector: 'app-mission-detail',
  imports: [WaypointCardComponent, RouterLink, MissionMapComponent, TelemetryCardComponent],
  templateUrl: './mission-detail.component.html',
  styles: ``
})
export class MissionDetailComponent implements OnInit {

  mission?: Mission

  waypoints: Waypoint[] = []

  telemetry: Telemetry = {
    bateria: 0,
    altitud: 0,
    velocidad: 0,
    latitud: 0,
    longitud: 0,
    estado: 'En vuelo'
  }
  constructor(private missionService: MissionService,
    private waypointService: WaypointService,
    private route: ActivatedRoute,
  private webSocketService: WebSocketServiceService) {
    console.log('MISSION DETAIL CARGADO');
  }

  ngOnInit() {

    
    const missionId = Number(this.route.snapshot.paramMap.get('id')); // Get the mission ID from the route parameters
    console.log('ID DE MISIÓN:', missionId);
    
      // CARGAR MISION
    if (missionId) {
      this.missionService.getMission(missionId).subscribe({
        next: (mission) => {
          this.mission = mission;
          console.log('MISIÓN:', this.mission);
        }
      });

      // CARGAR WAYPOINTS DE LA MISION
      this.waypointService.getWaypointsByMissionId(missionId).subscribe({
        next: (waypoints) => {
          this.waypoints = waypoints;
          console.log('WAYPOINTS:', this.waypoints);
        },
        error: (error) => {
          console.error('Error al obtener los waypoints:', error);
        }
      });
    }


    // Suscribirse a los datos de telemetría del WebSocket
    this.webSocketService.connect().subscribe({
      next: (telemetry) => {
         console.log('Telemetría recibida:', telemetry);
        this.telemetry = telemetry;
       
      },
      error: (error) => {
        console.error('Error en la conexión WebSocket:', error);
      }
    });
  }
  //CON REFERENCIA AL ESTADO DEL DRON
  @ViewChild(MissionMapComponent)
  missionMap!: MissionMapComponent;

  startMission(): void {
    this.missionMap.startMission();
  }

  pauseMission(): void {
    this.missionMap.pauseMission();
  }

  stopMission(): void {
    this.missionMap.stopMission();
  }

  restartMission(): void {
    this.missionMap.restartMission();
  }

}
