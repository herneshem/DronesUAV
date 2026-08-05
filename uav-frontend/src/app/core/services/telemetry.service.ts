import { Injectable } from '@angular/core';
import { Telemetry } from '../../models/telemetry';

@Injectable({
  providedIn: 'root'
})
export class TelemetryService {

  constructor() { }

  getTelemetry(droneId: number): Telemetry | undefined {
    // Placeholder implementation - replace with actual telemetry data retrieval logic
    const telemetries = [

      { droneId: 1, bateria: 85, altitud: 1200, velocidad: 45, latitud: 37.7749, longitud: -122.4194, estado: 'En vuelo' },
      { droneId: 2, bateria: 60, altitud: 800, velocidad: 30, latitud: 34.0522, longitud: -118.2437, estado: 'En vuelo' },
      { droneId: 3, bateria: 90, altitud: 1500, velocidad: 50, latitud: 40.7128, longitud: -74.0060, estado: 'En vuelo' }


    ];



    return telemetries.find(telemetry => telemetry.droneId === droneId);


  }


}
