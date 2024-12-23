package com.study.todolist.service;

import com.study.todolist.dto.request.todo.ReqAddtodoDto;
import com.study.todolist.dto.request.todo.ReqModifyDto;
import com.study.todolist.dto.response.todo.RespTodoCountsDto;
import com.study.todolist.dto.response.todo.RespTodoDto;
import com.study.todolist.entity.Todo;
import com.study.todolist.repository.TodoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoMapper todoMapper;

    public int addTodo(ReqAddtodoDto dto) {
        return todoMapper.save(dto.toEntity());
    }

    // 오광님 강의 연습
//    public List<Todo> responseTodolist() {
//        List<Todo> todolist = new ArrayList<>();
//        List<RespGetTodolistDto> respTodolist = new ArrayList<>();
//
//        todolist = todoMapper.finAll();
//        for(Todo todo: todolist) {
//            Todo totoEntity = Todo.builder()
//                    .todoId(todo.getTodoId())
//                    .build();
//
//            respTodolist.append(totoEntity);
//        }
//
//        return respTodolist;
//    }

    public List<RespTodoDto> getTodoList() {
        List<Todo> todoList = todoMapper.findAll();
        List<RespTodoDto> dtoList = new ArrayList<>(); // 응답형태의 데이터로 바꿔서 응답해줘야함

        for(Todo todo : todoList) {
            dtoList.add(todo.toTodoDto());
        }

        return dtoList;
    }

    public RespTodoCountsDto getTodoCounts() {
        return todoMapper.getTodoCounts().toDto();
    }

    public int changeStatus(int todoId) {
        return todoMapper.changeStatus(todoId);
    }

    public int modifyTodo(ReqModifyDto dto) {
        return todoMapper.modify(dto.toEntity());
    }

    public int deleteTodo(int todoId) {
        return todoMapper.deleteByTodoId(todoId);
    }
}
