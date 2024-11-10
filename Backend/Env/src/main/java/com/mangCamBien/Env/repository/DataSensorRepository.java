package com.mangCamBien.Env.repository;

import com.mangCamBien.Env.entity.DataSensor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
@Repository
public interface DataSensorRepository extends JpaRepository<DataSensor, Long> {
    @Query("SELECT d FROM DataSensor d WHERE " +
            "(LOWER(d.temperature) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(d.humidity) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(d.light) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:startDate IS NULL OR d.time >= :startDate) " +
            "AND (:endDate IS NULL OR d.time <= :endDate) " +
            "ORDER BY d.id DESC")
    Page<DataSensor> findByCondition(@Param("search") String search,
                                     @Param("startDate") LocalDateTime startDate,
                                     @Param("endDate") LocalDateTime endDate,
                                     Pageable pageable);


    DataSensor findTopByOrderByTimeDesc();
    // Query to find the latest record by time
    @Query("SELECT d FROM DataSensor d WHERE d.time = (SELECT MAX(ds.time) FROM DataSensor ds)")
    DataSensor findLatestRecord();
}

/*
su dung JapRepository<DataSensor, long> de thuc hien cac thao tac CRUD voi bang data_sensor
doan query trong repository la findLatestRecord() dung de lay ban ghi moi dua tren thoi gian
 */