package com.mangCamBien.Env.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class DataSensorResponse{
    private Long id;
    private String temperature;
    private String humidity;
    private String light;
    private LocalDateTime time;
}
// mô hình dữ liệu phan hoi
// vs respone(json) -> json