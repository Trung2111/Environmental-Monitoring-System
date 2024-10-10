package com.mangCamBien.Env.service;

import com.mangCamBien.Env.entity.Action;
import com.mangCamBien.Env.repository.ActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MqttService {

    @Autowired
    private MqttPahoMessageHandler mqttPahoMessageHandler;

    @Autowired
    private ActionRepository actionRepository;

    // Publish to MQTT and save action to the database
    public void publish(String topic, String payload, String device, String action) {
        // Publish message to MQTT
        Message<String> message = MessageBuilder.withPayload(payload)
                .setHeader("mqtt_topic", topic)
                .build();
        mqttPahoMessageHandler.handleMessage(message);

        // Convert action to string ("on" or "off")
        String actionString = "off"; // Default to off
        if ("1".equals(action)) {
            actionString = "on"; // Set to on if action is 1
        }

        // Save action to database
        Action deviceAction = new Action();
        deviceAction.setDevice(device);
        deviceAction.setAction(actionString);
        deviceAction.setTime(LocalDateTime.now());

        actionRepository.save(deviceAction);
    }
}
