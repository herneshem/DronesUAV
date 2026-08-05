import { Component, OnInit } from '@angular/core';
import { Drone } from '../../models/drone';
import { DroneService } from '../../core/services/drone.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Telemetry } from '../../models/telemetry';
import { Mission } from '../../models/mission';
import { TelemetryService } from '../../core/services/telemetry.service';
import { MissionService } from '../../core/services/mission.service';
import { TelemetryCardComponent } from '../../shared/components/telemetry-card/telemetry-card.component';
import { MissionCardComponent } from '../../shared/components/mission-card/mission-card.component';

@Component({
  selector: 'app-drone-detail',
  imports: [TelemetryCardComponent, MissionCardComponent, RouterLink],
  templateUrl: './drone-detail.component.html',
  styles: ``
})
export class DroneDetailComponent implements OnInit {

  drone?: Drone
  telemetry?: Telemetry
  missions: Mission[] = [];

  constructor(private droneService: DroneService, private route: ActivatedRoute, private telemetryService: TelemetryService, private missionService: MissionService) {

  }


  ngOnInit(): void {
    const droneId = Number(this.route.snapshot.paramMap.get('id'));
    if (droneId) {
      // Obtener drone
      this.droneService.getDrone(droneId).subscribe({
        next: (drone) => {
          this.drone = drone;
        },
          error: (error) => {
        console.error('Error al obtener el drone:', error);
      }
      });

      // Telemetría (todavía simulada)
      this.telemetry = this.telemetryService.getTelemetry(droneId);
      
      // Obtener misiones
      this.missionService.getMissions().subscribe({
        next: (missions) => {
          this.missions = missions;
        },
        error: (error) => {
        console.error('Error al obtener las misiones:', error);
      }
      });
    }
  }
}
