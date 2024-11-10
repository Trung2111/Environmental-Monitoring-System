package com.mangCamBien.Env.controller;

import com.mangCamBien.Env.dto.ActionResponse;
import com.mangCamBien.Env.dto.PageResponse;
import com.mangCamBien.Env.entity.Action;
import com.mangCamBien.Env.entity.DataSensor;
import com.mangCamBien.Env.service.ActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1")
public class ActionController {

    @Autowired
    private ActionService actionService;

    @GetMapping("/actions")
    public ResponseEntity<PageResponse<ActionResponse>> getActionByCondition(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
             @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "startDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(value = "endDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ){
        PageResponse<ActionResponse> actionResponses = actionService.getAllActionResponses(pageNo, pageSize, search, startDate, endDate);
        return new ResponseEntity<>(actionResponses, HttpStatus.OK);
    }

    @GetMapping("/actions/latest")
    public ResponseEntity<Action> getLatestAction() {
        Action latestRecord = actionService.getLatestRecord();
        if (latestRecord != null) {
            return ResponseEntity.ok().body(latestRecord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
