package com.mangCamBien.Env.service;

import com.mangCamBien.Env.dto.ActionResponse;
import com.mangCamBien.Env.dto.PageResponse;
import com.mangCamBien.Env.entity.Action;
import com.mangCamBien.Env.repository.ActionRepository;
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
public class ActionService {

    @Autowired
    private ActionRepository actionRepository;

    public PageResponse<ActionResponse> getAllActionResponses(int pageNo, int pageSize, String search, LocalDateTime startDate, LocalDateTime endDate) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by("id").descending());
        Page<Action> actions = actionRepository.findByCondition(search, startDate, endDate, pageable);

        List<ActionResponse> content = actions.getContent().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

        PageResponse<ActionResponse> pageResponse = new PageResponse<>();
        pageResponse.setContent(content);
        pageResponse.setPageNo(actions.getNumber());
        pageResponse.setPageSize(actions.getSize());
        pageResponse.setTotalElement(actions.getTotalElements());
        pageResponse.setTotalPages(actions.getTotalPages());
        pageResponse.setLast(actions.isLast());

        return pageResponse;
    }

    private ActionResponse convertToResponse(Action action) {
        ActionResponse response = new ActionResponse();
        response.setId(action.getId());
        response.setDevice(action.getDevice());
        response.setAction(action.getAction());
        response.setTime(action.getTime());
        return response;
    }

    public Action getLatestRecord() {
        return actionRepository.findLatestRecord();
    }
}

/*
Sử dụng phương thức convertToResponse() để chuyển đổi dữ liệu entity Action sang dạng DTO ActionResponse.
Xử lý việc phân trang (Pageable) và trả về danh sách các hành động dưới dạng ActionResponse.
 */