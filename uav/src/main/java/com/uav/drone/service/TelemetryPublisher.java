package com.uav.drone.service;

import com.uav.drone.DTO.TelemetryDto;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class TelemetryPublisher {

    private final SimpMessagingTemplate messagingTemplate;

    //CONSTRUCTOR
    public TelemetryPublisher(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }



    public void sendTelemetry(TelemetryDto telemetry) {

        System.out.println("Publicando: " + telemetry);

        messagingTemplate.convertAndSend("/topic/telemetry", telemetry);


    }
}
