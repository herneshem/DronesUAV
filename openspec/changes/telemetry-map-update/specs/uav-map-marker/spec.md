## Purpose

Permitir que la posición visual del UAV en el mapa se mantenga sincronizada con las nuevas coordenadas de telemetría recibidas por el sistema.

## ADDED Requirements

### Requirement: Actualización de posición del marcador UAV

El sistema SHALL actualizar la posición del marcador del UAV cuando reciba nuevas coordenadas válidas de latitud y longitud.

#### Scenario: Movimiento del marcador con nueva posición

- **WHEN** el sistema recibe una nueva posición válida del UAV.
- **THEN** el marcador del UAV SHALL moverse a las nuevas coordenadas en el mapa.

#### Scenario: Posición inválida

- **WHEN** el sistema recibe coordenadas no válidas o incompletas.
- **THEN** el marcador SHALL mantener su posición actual y no actualizarse.