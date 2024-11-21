#ifndef _MQTT_H_
#define _MQTT_H_

// Include Library
#include <WiFi.h>
#include <ArduinoJson.h>
#include <PubSubClient.h>
#include <String.h>

// Include Header File
#include "dht11.h"
#include "bh1750fvi.h"

#define LED_PIN 17
#define FAN_PIN 25
#define WARNING_PIN 5

const float LIGHT_THRESHOLD_HIGH = 900.0;   // Ngưỡng ánh sáng cao
extern PubSubClient client;
extern volatile uint8_t flag_warn;
extern volatile bool lightHighSent;


// Function
void Led_Init(void);
void Mqtt_Init(void);
void Mqtt_Reconnect(void);
void Mqtt_Loop(void);
void MqttSend();
// Function warning
void Mqtt_SendWarning(void);
void Mqtt_LightWarning();
void blinkLED(int pin, int interval);

#endif