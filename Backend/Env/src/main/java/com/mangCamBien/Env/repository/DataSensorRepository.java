package com.mangCamBien.Env.repository;

import com.mangCamBien.Env.entity.DataSensor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DataSensorRepository extends JpaRepository<DataSensor,Long> {
    // Query to find the latest record by time
    @Query("SELECT d FROM DataSensor d WHERE d.time = (SELECT MAX(ds.time) FROM DataSensor ds)")
    DataSensor findLatestRecord();
}
