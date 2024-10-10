package com.mangCamBien.Env.controller;

import com.mangCamBien.Env.dto.ActionResponse;
import com.mangCamBien.Env.dto.PageResponse;
import com.mangCamBien.Env.service.ActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ActionController {

    @Autowired
    private ActionService actionService;

    @GetMapping("/actions")
    public ResponseEntity<PageResponse<ActionResponse>> getActionByCondition(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize
    ){
        PageResponse<ActionResponse> actionResponses = actionService.getAllActionResponses(pageNo, pageSize);
        return new ResponseEntity<>(actionResponses, HttpStatus.OK);
    }
}
