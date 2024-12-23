import { useRecoilState } from "recoil";
import { instance } from "../utils/instance";
import { todolistAtom } from "../../atoms/todolistAtom";

export async function changeCheckTodoStatus(todoId) {
    let response = null;
    try {
        response = await instance.put(`/todo/${todoId}/status`);
    } catch(e) {
        console.error(e);
        response = e.response;
    }
    return response;
}

export async function ModifyTodo(modifyTodo) {
    const todoId = modifyTodo.todoId;

    let response = null;
    try {
        response = await instance.put(`/todo/${todoId}`, modifyTodo);
    } catch(e) {
        console.error(e);
        response = e.response;
    }
    return response;
}