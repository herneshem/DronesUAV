# Design: telemetry-map-update

## Context

El frontend Angular dispone de un mapa donde se representa la posición del UAV. 
Actualmente la posición del marcador debe poder actualizarse cuando cambien los datos de telemetría.

## Goals / Non-Goals

**Goals:**

- Actualizar la posición del marcador del UAV cuando existan nuevas coordenadas.
- Mantener separada la lógica de recepción de datos y la representación visual del mapa.
- Permitir futuras fuentes de telemetría (simulador o UAV real).

**Non-Goals:**

- Implementar todavía comunicación real con el UAV.
- Modificar el protocolo de telemetría.
- Crear el simulador UAV.

## Decisions

- La actualización de posición se realizará mediante los datos del modelo de telemetría existente.
- El componente responsable del mapa gestionará únicamente la representación del marcador.
- La lógica de obtención de telemetría permanecerá separada del componente visual.

Alternativas consideradas:

- Actualizar directamente el marcador desde cualquier servicio:
  - Se descarta porque aumenta el acoplamiento entre lógica de negocio y vista.

## Risks / Trade-offs

- [Riesgo] Actualizaciones frecuentes pueden provocar demasiados movimientos del mapa.
  - Mitigación: controlar la frecuencia de actualización de telemetría.

- [Riesgo] Coordenadas inválidas pueden mover el marcador a una posición incorrecta.
  - Mitigación: validar latitud y longitud antes de actualizar.

## Migration Plan

No aplica. Es una nueva capacidad visual del frontend.

## Open Questions

- ¿La telemetría llegará posteriormente mediante WebSocket o mediante otro mecanismo?