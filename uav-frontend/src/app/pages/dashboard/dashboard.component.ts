import { Component } from '@angular/core';

import { DroneComponent } from '../drone/drone.component';
import { MissionComponent } from '../mission/mission.component';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    DroneComponent,
    MissionComponent,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {}