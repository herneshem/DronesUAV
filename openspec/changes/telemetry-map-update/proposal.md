# Proposal: telemetry-map-update

## Why

El sistema necesita actualizar visualmente la posición del UAV en el mapa cuando cambian sus coordenadas de telemetría.

## What Changes

- Añadir actualización dinámica del marcador del UAV.
- Mover el marcador Leaflet usando nuevos valores de latitud y longitud.
- Mantener la posición del mapa sincronizada con la telemetría recibida.

## Capabilities

### New Capabilities

- uav-map-marker: Permite actualizar la posición del marcador del UAV en el mapa.

### Modified Capabilities

## Impact

- Frontend Angular.
- Componente del mapa de misión.
- Servicio de telemetría.
- Modelo de telemetría.