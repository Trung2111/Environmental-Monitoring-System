package com.mangCamBien.Env.config;//package com.mangCamBien.Env.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mangCamBien.Env.entity.Action;
import com.mangCamBien.Env.entity.DataSensor;
import com.mangCamBien.Env.repository.ActionRepository;
import com.mangCamBien.Env.repository.DataSensorRepository;
import lombok.extern.slf4j.Slf4j;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.channel.DirectChannel;
import org.springframework.integration.core.MessageProducer;
import org.springframework.integration.mqtt.core.DefaultMqttPahoClientFactory;
import org.springframework.integration.mqtt.core.MqttPahoClientFactory;
import org.springframework.integration.mqtt.inbound.MqttPahoMessageDrivenChannelAdapter;
import org.springframework.integration.mqtt.outbound.MqttPahoMessageHandler;
import org.springframework.integration.mqtt.support.DefaultPahoMessageConverter;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHandler;
import java.time.LocalDateTime;

@Configuration
@Slf4j
public class MqttConfig {

    @Autowired
    private ActionRepository actionRepository;

    @Autowired
    private DataSensorRepository dataSensorRepository;


    private String brokerUrl = "tcp://localhost:1996";


    private String username = "admin";


    private String password = "admin";
// thiết lập kết nối đến broker MQTT
    @Bean
    public MqttPahoClientFactory mqttClientFactory() {
        DefaultMqttPahoClientFactory factory = new DefaultMqttPahoClientFactory();
        MqttConnectOptions options = new MqttConnectOptions();
        options.setServerURIs(new String[]{brokerUrl});
        options.setUserName(username);
        options.setPassword(password.toCharArray());
        options.setConnectionTimeout(1500);  // thoi gian huy connect
        options.setKeepAliveInterval(800);  //  thoi gian cho phan hoi cuoi cung
        factory.setConnectionOptions(options);
        return factory;
    }

    @Bean
    public MessageChannel mqttInputChannel() {
        return new DirectChannel();
    }

    // Inbound adapter for 'data_sensor' topic nhận dữ liệu cảm biến từ topic 'datasensor'
    @Bean
    public MessageProducer inboundDataSensor() {
        MqttPahoMessageDrivenChannelAdapter adapter =
                new MqttPahoMessageDrivenChannelAdapter("spring-mqtt-client-data-sensor", mqttClientFactory(),
                        "data_sensor");  // Subscribe to "data_sensor" topic
        adapter.setCompletionTimeout(5000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }

    // Inbound adapter for 'action' topic nhan du lieu dieu khien thiet bi qua topic 'action'
    @Bean
    public MessageProducer inboundAction() {
        MqttPahoMessageDrivenChannelAdapter adapter =
                new MqttPahoMessageDrivenChannelAdapter("spring-mqtt-client-action", mqttClientFactory(),
                        "action");  // Subscribe to "action" topic
        adapter.setCompletionTimeout(5000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }

    @Bean
    public MessageProducer inboundWarning() {
        MqttPahoMessageDrivenChannelAdapter adapter =
                new MqttPahoMessageDrivenChannelAdapter("spring-mqtt-client-warning", mqttClientFactory(),
                        "warning");  // Subscribe to "warning" topic
        adapter.setCompletionTimeout(5000);
        adapter.setConverter(new DefaultPahoMessageConverter());
        adapter.setQos(1);
        adapter.setOutputChannel(mqttInputChannel());
        return adapter;
    }

    /*
    Dữ liệu nhận từ topic data_sensor (nhiệt độ, độ ẩm, ánh sáng) được phân tích và xử lý tại phương thức
    handler(). JSON được phân tích và xác nhận xem các trường dữ liệu có đầy đủ không (nhiệt độ, độ ẩm, ánh sáng).
    Nếu hợp lệ, dữ liệu sẽ được lưu vào cơ sở dữ liệu MySQL thông qua lớp DataSensorRepository.
     */
    @Bean
    @ServiceActivator(inputChannel = "mqttInputChannel")
    public MessageHandler handler() {
        return message -> {
            String payload = message.getPayload().toString();

            // Parse JSON data
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                JsonNode jsonNode = objectMapper.readTree(payload);

                // Check if the JSON has the required fields for data_sensor
                if (jsonNode.has("temperature") && jsonNode.has("humidity") && jsonNode.has("light") && jsonNode.has("co2")) {
                    log.info("Valid data received: temperature = {}, humidity = {}, light = {},  co2 = {}",
                            jsonNode.get("temperature").asText(),
                            jsonNode.get("humidity").asText(),
                            jsonNode.get("light").asText(),
                            jsonNode.get("co2").asText());
                    // luu vao mysql
                    saveDataSensor(jsonNode);
                } else {
                    log.warn("Missing required fields in JSON: {}", jsonNode);
                }
                if (jsonNode.has("warning")) {
                    saveAction(jsonNode);
                }
            } catch (Exception e) {
                log.error("Error parsing JSON: {}", e.getMessage(), e);
            }
        };
    }

    // Save DataSensor entity to database
    private void saveDataSensor(JsonNode jsonNode) {
        DataSensor dataSensor = new DataSensor();
        dataSensor.setTemperature(jsonNode.get("temperature").asText());
        dataSensor.setHumidity(jsonNode.get("humidity").asText());
        dataSensor.setLight(jsonNode.get("light").asText());
        dataSensor.setCo2(jsonNode.get("co2").asText());
        dataSensor.setTime(LocalDateTime.now());
        try {
            log.info("Saving DataSensor to MySQL: {}", dataSensor);
            dataSensorRepository.save(dataSensor);
        } catch (Exception e) {
            log.error("Error saving DataSensor to MySQL: {}", e.getMessage(), e);
        }
    }

    private void saveAction(JsonNode jsonNode) {
        Action action = new Action();
        action.setDevice("warning led");
        action.setAction(jsonNode.get("warning").asText());
        action.setTime(LocalDateTime.now());
        actionRepository.save(action);
    }

    @Bean
    public MqttPahoMessageHandler mqttPahoMessageHandler() {
        MqttPahoMessageHandler messageHandler = new MqttPahoMessageHandler("spring-mqtt-client", mqttClientFactory());
        messageHandler.setAsync(true);
        return messageHandler;
    }
}
