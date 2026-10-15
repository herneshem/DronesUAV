# Tasks: telemetry-map-update

## 1. Preparación del modelo de posición

- [ ] 1.1 Revisar el modelo de telemetría para asegurar que contiene latitud y longitud.
- [ ] 1.2 Definir el formato esperado de actualización de posición del UAV.

## 2. Actualización del mapa

- [ ] 2.1 Añadir la lógica necesaria para actualizar la posición del marcador cuando cambien las coordenadas.
- [ ] 2.2 Verificar que el marcador mantiene la posición correcta después de varias actualizaciones.

## 3. Validación

- [ ] 3.1 Probar el movimiento del marcador con diferentes coordenadas.
- [ ] 3.2 Validar el comportamiento cuando llegan coordenadas inválidas.

<success_criteria>

El marcador del UAV se desplaza correctamente cuando recibe nuevas coordenadas válidas y mantiene su posición cuando los datos no son utilizables.

</success_criteria>
