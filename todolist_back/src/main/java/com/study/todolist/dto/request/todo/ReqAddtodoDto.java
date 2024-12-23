package com.study.todolist.dto.request.todo;

import com.study.todolist.entity.Todo;
import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Data
public class ReqAddtodoDto {
    private String title;
    private String content;
    private String dateTime;
    private int important;
    private int busy;

    //dateTime을 entity의 localDateTime 형태로 바꿔야하기 때문에 -> 형 변환 필요
    public Todo toEntity() {
        //
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        // 앞에 있는 문자열을 뒤에 있는 형태로 변환하라, 초가 없어서 뒤에 초도 붙여줌
        LocalDateTime todoDateTime = LocalDateTime.parse(dateTime + ":00", formatter);

        return Todo.builder()
                .title(title)
                .content(content)
                .important(important)
                .busy(busy)
                .todoDateTime(todoDateTime)
                .build();
    }
}
