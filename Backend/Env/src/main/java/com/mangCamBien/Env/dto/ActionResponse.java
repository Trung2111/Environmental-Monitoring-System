package com.mangCamBien.Env.dto;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class ActionResponse{
    private Long id;
    private String device;
    private String action;
    private LocalDateTime time;
}
