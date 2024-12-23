import axios from "axios";

export const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true // 이걸 사용해야 자바 session을 쓸 수 있다?
});