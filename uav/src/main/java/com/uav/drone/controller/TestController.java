package com.uav.drone.controller;

import com.uav.drone.DTO.TelemetryDto;
import com.uav.drone.service.TelemetryPublisher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final TelemetryPublisher telemetryPublisher;

    public TestController(TelemetryPublisher telemetryPublisher) {
        this.telemetryPublisher = telemetryPublisher;
    }

    @GetMapping("/telemetry")
    public String sendTelemetry() {

        System.out.println("Enviando telemetría...");

        TelemetryDto telemetry = new TelemetryDto(
                40.4168,
                -3.7038,
                120,
                15,
                98,
                "En vuelo"
        );

        telemetryPublisher.sendTelemetry(telemetry);

        return "Telemetría enviada";
    }
}