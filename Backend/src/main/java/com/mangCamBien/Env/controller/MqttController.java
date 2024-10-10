package com.mangCamBien.Env.controller;

import com.mangCamBien.Env.dto.FanRequest;
import com.mangCamBien.Env.dto.LedRequest;
import com.mangCamBien.Env.service.MqttService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class MqttController {

    @Autowired
    private MqttService mqttService;

    // Control fan
    @PostMapping("/fan")
    public ResponseEntity<String> controlFan(@RequestBody FanRequest fanRequest) {
        String payload = "{\"fan\":\"" + fanRequest.getFan() + "\"}";
        mqttService.publish("action", payload, "fan", fanRequest.getFan());
        return ResponseEntity.ok("Fan status updated to " + fanRequest.getFan());
    }

    // Control LED
    @PostMapping("/led")
    public ResponseEntity<String> controlLed(@RequestBody LedRequest ledRequest) {
        String payload = "{\"led\":\"" + ledRequest.getLed() + "\"}";
        mqttService.publish("action", payload, "led", ledRequest.getLed());
        return ResponseEntity.ok("LED status updated to " + ledRequest.getLed());
    }


}
