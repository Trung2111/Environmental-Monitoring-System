package com.mangCamBien.Env.repository;

import com.mangCamBien.Env.dto.ActionResponse;
import com.mangCamBien.Env.entity.Action;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ActionRepository extends JpaRepository<Action,Long> {
    @Query("SELECT a FROM Action a WHERE a.time = (SELECT MAX(ds.time) FROM Action ds)")
    Action findLatestRecord();
    @Query("SELECT a FROM Action a WHERE " +
            "(:search IS NULL OR a.device LIKE %:search% OR a.action LIKE %:search%) AND " +
            "(:startDate IS NULL OR a.time >= :startDate) AND " +
            "(:endDate IS NULL OR a.time <= :endDate)")
    Page<Action> findByCondition( String search,
                                  LocalDateTime startDate,
                                  LocalDateTime endDate,
                                 Pageable pageable);
}
/*
    de quan ly cac hanh dong dieu khien tu bang action
 */