package com.mangCamBien.Env.controller;

import com.mangCamBien.Env.dto.DataSensorResponse;
import com.mangCamBien.Env.dto.PageResponse;
import com.mangCamBien.Env.entity.DataSensor;
import com.mangCamBien.Env.service.ActionService;
import com.mangCamBien.Env.service.DataSensorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


// thiết lập đường dẫn url
import java.util.List;

@RestController
@RequestMapping("/sensor")
public class DataSensorController {
    @Autowired
    private DataSensorService dataSensorService;

    @GetMapping("/data")
    public ResponseEntity<PageResponse<DataSensorResponse>> getDataSensorByCondition(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize
    ) {
        return new ResponseEntity<>(dataSensorService.getAllDataSensorResponses(pageNo, pageSize), HttpStatus.OK);
    }

    @GetMapping("/latest")
    public ResponseEntity<DataSensor> getLatestDataSensor() {
        DataSensor latestRecord = dataSensorService.getLatestRecord();
        if (latestRecord != null) {
            return ResponseEntity.ok().body(latestRecord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
