package com.mangCamBien.Env.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "data_sensor")
public class DataSensor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "temperature")
    private String temperature;

    @Column(name = "humidity")
    private String humidity;

    @Column(name = "light")
    private String light;

    ///////////////////////
    @Column(name = "co2")
    private String co2;
    ////////////////////////

    @Column(name = "time")
    private LocalDateTime time;

    // Getter and Setter for temperature
    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    // Getter and Setter for light
    public String getLight() {
        return light;
    }

    public void setLight(String light) {
        this.light = light;
    }

    ///add data gas ///////////////////////////////////////
    // Getter and Setter for gas
    public String getCo2() {
        return co2;
    }

    public void setCo2(String co2) {
        this.co2 = co2;
    }

    // Getter and Setter for time
    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }

    public String getHumidity() {
        return humidity;
    }

    public void setHumidity(String humidity) {
        this.humidity = humidity;
    }
}
/*
    Chua cac truong temperature , humidity , light, time luu du lieu do tu cam bien
    su dung LocalDatetime de luu thoi gian cua du lieu cam bien
* */