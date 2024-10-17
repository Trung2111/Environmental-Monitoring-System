package com.mangCamBien.Env.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;


@Entity
@Table(name = "action")
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "device")
    private String device;

    @Column(name = "action")
    private String action;

    @Column(name = "time")
    private LocalDateTime time;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDevice() {
        return device;
    }

    public void setDevice(String device) {
        this.device = device;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
/*
đại diện cho các bảng trong cơ sở dữ liệu mysql lien qua den du lieu cam bien va hanh dong dieu khien thiet bi
 luu cac hanh dong dieu khien thiet bi nhu dieu khien den led

* */