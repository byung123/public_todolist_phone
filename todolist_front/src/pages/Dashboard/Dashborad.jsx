/** @jsxImportSource @emotion/react */ // div 안에 원래 css라는 속성이 없는데 그걸 만들어줌 - 클래스이름 안짓고 스타일 적용 가능해짐
import { Route, Routes } from "react-router-dom";
import DateTitle from "../../components/DashBoard/DateTitle/DateTitle";
import MenuList from "../../components/DashBoard/MenuList/MenuList";
import Search from "../../components/DashBoard/Search/Search";
import MainContainer from "../../components/MainContainer/MainContainer";
import RegisterTodoButton from "../../components/RegisterTodoButton/RegisterTodoButton";
import * as s from "./style";
import TodoAll from "../TodoAll/TodoAll";
import { useRecoilState, useSetRecoilState } from "recoil";
import { refreshTodoListAtom, todolistAtom } from "../../atoms/todolistAtom";
import { getTodoAllApi, getTodoCountsApi } from "../../apis/todoApis/getTodoApi";
import { useEffect } from "react";
import TodoComplete from "../TodoComplete/TodoComplete";
import TodoImportant from "../Todoimportant/TodoImportant";
import TodoBusy from "../TodoBusy/TodoBusy";
import TodoToday from "../TodoToday/TodoToday";

function Dashborad(props) {
    const setTodolistAll = useSetRecoilState(todolistAtom);
    const [ refresh, setRefresh ] = useRecoilState(refreshTodoListAtom);

    const requestTodolist = async () => {
        const todolist = await getTodoAllApi();
        const counts = await getTodoCountsApi();
        setTodolistAll({
            todolist: todolist?.data,
            counts: counts?.data
        });
        // ?란 : a라는 객체가 있다고 치자, a가 null일 땐, a. 하면서 참조할 수 없기 때문에 오류뜸(null).
        // 그래서 만약 참조할 수 없는 상황이라면(null 이거나 등등) 참조하지마라 라고 명시해주는 것 : null이면 null을 리턴해줌
    }

    // 이 방법으로 많이 사용함 - 전역에 true 줘서
    // 다른 페이지에서 바꿔줘도 동작하게끔
    useEffect(() => {
        if(refresh) {
            requestTodolist();
        }
        setRefresh(false);
    }, [refresh]);

    return (
        <MainContainer>
            <div css={s.layout}>
                <header>
                    <Search />
                </header>
                <main>
                    <DateTitle />
                    <MenuList />
                </main>
                <footer>
                    <RegisterTodoButton />
                </footer>
            </div>
            <Routes>
                <Route path="/all" element={<TodoAll />} />
                {/* all 말고 다른 모든 경로에 대해서 notFound 페이지를 띄어라(서브에서도 씀) */}
                {/* <Route path="*" element={<NotFound />} />  */}
                <Route path="/complete" element={<TodoComplete />} />
                <Route path="/important" element={<TodoImportant />} />
                <Route path="/busy" element={<TodoBusy />} />
                <Route path="/today" element={<TodoToday />} />
            </Routes>
        </MainContainer>
    );
}

export default Dashborad;