package com.mangCamBien.Env.service;

import com.mangCamBien.Env.dto.DataSensorResponse;
import com.mangCamBien.Env.dto.PageResponse;
import com.mangCamBien.Env.entity.DataSensor;
import com.mangCamBien.Env.repository.DataSensorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DataSensorService {
    @Autowired
    private DataSensorRepository dataSensorRepository;

    public PageResponse<DataSensorResponse> getAllDataSensorResponses(int pageNo, int pageSize, String search, LocalDateTime startDate, LocalDateTime endDate) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<DataSensor> dataSensors;

        if ((search != null && !search.isEmpty()) || startDate != null || endDate != null) {
            dataSensors = dataSensorRepository.findByCondition(search, startDate, endDate, pageable);
        } else {
            dataSensors = dataSensorRepository.findAll(pageable);
        }

        List<DataSensorResponse> content = dataSensors.getContent().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        PageResponse<DataSensorResponse> pageResponse = new PageResponse<>();
        pageResponse.setContent(content);
        pageResponse.setPageNo(dataSensors.getNumber());
        pageResponse.setPageSize(dataSensors.getSize());
        pageResponse.setTotalElement(dataSensors.getTotalElements());
        pageResponse.setTotalPages(dataSensors.getTotalPages());
        pageResponse.setLast(dataSensors.isLast());

        return pageResponse;
    }

    private DataSensorResponse convertToResponse(DataSensor dataSensor) {
        DataSensorResponse response = new DataSensorResponse();
        response.setId(dataSensor.getId());
        response.setTemperature(dataSensor.getTemperature());
        response.setHumidity(dataSensor.getHumidity());
        response.setLight(dataSensor.getLight());
        response.setCo2(dataSensor.getCo2());
        response.setTime(dataSensor.getTime());
        return response;
    }
    public DataSensor getLatestRecord() {
        return dataSensorRepository.findTopByOrderByTimeDesc();
    }
}

/*
    Tương tự như ActionService, dịch vụ này xử lý việc phân trang và trả về danh sách các bản ghi cảm biến.
    Có phương thức getLatestRecord() để gọi repository và lấy bản ghi cảm biến mới nhất.
 */