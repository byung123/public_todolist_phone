package com.study.todolist.entity;

import com.study.todolist.dto.response.todo.RespTodoCountsDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TodoCounts {
    private int all;
    private int today;
    private int important;
    private int busy;
    private int complete;

    public RespTodoCountsDto toDto() {
        return RespTodoCountsDto.builder()
                .all(all)
                .today(today)
                .important(important)
                .busy(busy)
                .complete(complete)
                .build();
    }
}
