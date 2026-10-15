package com.uav.drone.controller;


import com.uav.drone.service.MavlinkService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MavlinkController {

    private final MavlinkService mavlinkService;

    public MavlinkController(MavlinkService mavlinkService) {
        this.mavlinkService = mavlinkService;
    }

    @GetMapping("/api/mavlink/test")
    public String testConnection() {
        mavlinkService.testConnection();

        return "Prueba MAVLink ejecutada";
    }

    @GetMapping("/api/mavlink/position")
    public String startPositionTelemetry() {
        mavlinkService.startPositionTelemetry();

        return "Telemetría de posición iniciada";
    }



}
