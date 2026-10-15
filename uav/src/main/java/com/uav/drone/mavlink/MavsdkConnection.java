package com.uav.drone.mavlink;

import io.mavsdk.System;
import org.springframework.stereotype.Component;

@Component
public class MavsdkConnection {

    private final System drone;

    public MavsdkConnection() {
        drone = new System("localhost", 50051);
    }

    public System getDrone() {
        return drone;
    }
}