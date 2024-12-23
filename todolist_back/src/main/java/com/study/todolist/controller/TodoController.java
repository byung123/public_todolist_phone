package com.study.todolist.controller;


import com.study.todolist.dto.request.todo.ReqAddtodoDto;
import com.study.todolist.dto.request.todo.ReqModifyDto;
import com.study.todolist.service.TodoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/v1")
public class TodoController {

    @Autowired
    private TodoService todoService;

    // created(보통 post 요청에 많이 응답함) : 201 응답
    @PostMapping("/todo")
    public ResponseEntity<?> add(@RequestBody ReqAddtodoDto dto) {
        int successCount = todoService.addTodo(dto);
        return ResponseEntity.created(null).body(successCount);
    }

    @GetMapping("/todolist")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok().body(todoService.getTodoList());
    }

    @GetMapping("/todo/counts")
    public ResponseEntity<?> getCounts() {
        return ResponseEntity.ok().body(todoService.getTodoCounts());
    }

    @PutMapping("/todo/{todoId}/status")
    public ResponseEntity<?> changeStatus(@PathVariable int todoId) {
        log.info("{}", todoId);
        return ResponseEntity.ok().body(todoService.changeStatus(todoId));
    }

    /*
     * 문제
     * ResModifyTodoDto
     * modifyTodo(todoService)
     * modifyTodoByTodoId(todoMapper)
     */

    @PutMapping("/todo/{todoId}") // dto 안에 todoId 이미 들어있기 때문에 @Pathvariable 할 필요 없음
    public ResponseEntity<?> modify(@RequestBody ReqModifyDto dto) {
        log.info("{}", dto);
        return ResponseEntity.ok().body(todoService.modifyTodo(dto));
    }

    @DeleteMapping("/todo/{todoId}")
    public ResponseEntity<?> delete(@PathVariable int todoId) {
        return ResponseEntity.ok().body(todoService.deleteTodo(todoId));
    }
}
