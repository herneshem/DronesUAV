package com.uav.drone.service;

import com.uav.drone.DTO.TelemetryDto;
import com.uav.drone.mavlink.MavsdkConnection;
import org.springframework.stereotype.Service;

@Service
public class MavlinkService {

    private final MavsdkConnection connection;
    private final TelemetryPublisher telemetryPublisher;

    public MavlinkService(
            MavsdkConnection connection,
            TelemetryPublisher telemetryPublisher) {

        this.connection = connection;
        this.telemetryPublisher = telemetryPublisher;
    }

    public void testConnection() {

        connection.getDrone()
                .getCore()
                .getConnectionState()
                .subscribe(state -> {

                    System.out.println(
                            "MAVSDK conectado: " + state.getIsConnected()
                    );

                });
    }

    public void startPositionTelemetry() {

        connection.getDrone()
                .getTelemetry()
                .getPosition()
                .subscribe(position -> {

                    double latitude = position.getLatitudeDeg();
                    double longitude = position.getLongitudeDeg();
                    double altitude = position.getAbsoluteAltitudeM();

                    System.out.println(
                            "LAT: " + latitude +
                                    " | LON: " + longitude +
                                    " | ALT: " + altitude
                    );

                    TelemetryDto telemetry = new TelemetryDto(
                            latitude,
                            longitude,
                            altitude,
                            0.0,
                            0.0,
                            "UNKNOWN"
                    );

                    telemetryPublisher.sendTelemetry(telemetry);
                });
    }
}