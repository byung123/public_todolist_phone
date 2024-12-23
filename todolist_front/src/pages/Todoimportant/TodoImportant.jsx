/** @jsxImportSource @emotion/react */
import * as s from "./style";
import PageAnimationLayout from "../../components/PageAnimationLayout/PageAnimationLayout";
import { useEffect, useState } from "react";
import BackButtonTop from "../../components/BackButtonTop/BackButtonTop";
import PageTitle from "../../components/PageTitle/PageTitle";
import { MENUS } from "../../constants/menus";
import { useRecoilState, useSetRecoilState } from "recoil";
import { refreshTodoListAtom, todolistAtom } from "../../atoms/todolistAtom";
import YearGroup from "../../components/YearFroup/YearGroup";
import TodoCalendar from "../../components/TodoCalendar/TodoCalendar";
import RegisterTodoButton from "../../components/RegisterTodoButton/RegisterTodoButton";
import { modifyTodoAtom, selectedCalendarTodoAtom } from "../../atoms/calendarAtoms";
import ConfirmButtonTop from "../../components/ConfirmButtonTop/ConfirmButtonTop";
import { ModifyTodo } from "../../apis/todoApis/modifyTodoApi";
import SubPageContainer from "../../components/SubPageContainer/SubPageContainer";

function TodoImportant(props) {
    const [ todolistAll ] = useRecoilState(todolistAtom);
    const [ selectedTodo, setSelectedTodo ] = useRecoilState(selectedCalendarTodoAtom); 
    const [ modifyTodo, setModifyTodo ] = useRecoilState(modifyTodoAtom);
    const setRefresh = useSetRecoilState(refreshTodoListAtom);
    
    const [ monthList, setMonthList ] = useState([]);
    const [ yearList, setYearList ] = useState([]);
    const [ calendar, setCalendar ] = useState([]);
    const [ isShow, setShow ] = useState(true); // true를 줘서 처음 랜더링을 없앰 (깜빡거리는 현상)
    const [ calendarData, setCalendarData ] = useState({});
    const [ submitButtonDisabled, setSubmitButtonDisabled ] = useState(true);


    // 밑에 주석 코드 할기 위한 이론 
    // useEffect(() => {
    //     const obj = {
    //         "a": {
    //             "test1": 10,
    //             "test2": 20,
    //             "test3": 30,
    //             "test4": 40
    //         },
    //         "b": {
    //             "test5": 50,
    //             "test6": 60,
    //             "test7": 70,
    //             "test8": 80
    //         },
    //     }
    //     const objList = Object.entries(obj);
    //     console.log(objList);
    //     for(let o of objList) {
    //         // console.log("key: " + o[0]);
    //         // console.log("value: " + o[1]); // 값 안에 또 객체이므로 이것도 배열로 만들어야 반복 돌릴 수 잇음
    //         const key = o[0];
    //         // console.log(o[0]);
    //         // console.log(o[1]);
    //         const value = Object.entries(o[1]);

    //         console.log("key: " + key);
    //         console.log("value: " + value); // entry 형태로 출력됨 이것을 반복 돌리면(콘솔 출력에선 그냥 줄줄이 나열해져서 나와서 구분이 안됨)
    //                                         // 근데 실제로는 배열로 묶여져있는 형태로 그냥 나오는듯
    //         for(let e of value) {
    //             const key2 = e[0];
    //             const value2 = e[1];
    //             console.log("key2: " + key2);
    //             console.log("value2: " + value2);
    //         }
    //     }
    // }, []);

    useEffect(() => {
        // 왜 modifyTodo에만 ?를 넣는 이유 : todoId가 없는 경우(맨 처음) 참조자체가 안되서
        // todolist.todo는 안들어 있을 수가 없다(있어야 필터가 동작하기 때문에 애초에 없는 경우는 없다)
        let preTodo = {
            ...(todolistAll.todolist.filter(todo => 
                todo.todoId === modifyTodo?.todoId)[0])
        }
        
        // 백앤드에선 표준 데이터를 받아야하기 때문에 프론트에서 미리 형태를 바꿔서 보내주기 위함(프론트에서 전처리)
        preTodo = {
            ...preTodo,
            todoDateTime: preTodo?.todoDateTime?.replaceAll(" ", "T")
        }
        // const disabled = modifyTodo === preTodo; // 그냥 쓰면 객체의 주소값을 비교하기 때문에 무조건 false가 나옴
        // 즉 서로의 객체가 같은지 비교하기 위해선 JSON 형태로 바꿔서 값 비교를 하거나 Entries로 바꿔서 안의 값 하나하나를 비교해야한다.
        const disabled = JSON.stringify(modifyTodo) === JSON.stringify(preTodo)  // 이러면 literal값 끼리 비교
            || !modifyTodo.title?.trim(); 

        setSubmitButtonDisabled(disabled);
    }, [modifyTodo])
    
    useEffect(() => {
        // DashBoard.jsx에서 데이터 받아온걸 map
        // const preYears = todolistAll.todolist.map(todo => todo.todoDateTime.slice(0, 4));

        const tempCalendarData = {};

        for(let todo of todolistAll.todolist) {
            if(todo.important !== 1) {
                continue;
            }

            const dateTime = todo.todoDateTime;
            const year = dateTime.slice(0,4);
            const month = dateTime.slice(5,7);
            const date = dateTime.slice(0, 10);

            if(!tempCalendarData[year]) {
                tempCalendarData[year] = {};
            }

            if(!tempCalendarData[year][month]) {
                tempCalendarData[year][month] = {}; 
            }

            if(!tempCalendarData[year][month][date]) {
                tempCalendarData[year][month][date] = []; // 배열로 만들어줘야 push 할 수 있음.
            }

            tempCalendarData[year][month][date].push(todo);
        }

        // setCalendar(<YearGroup calendarData={calendarData} />)
        setCalendarData(tempCalendarData);
        // 객체는 반복을 못 돌리므로 배열로 만듦 -> 안의 객체요소들도 배열 형태로 바껴서 배열의 첫 번째 값은 키 값, 주번 째 값은 value 값이 된다
        // const calendarDataEntries = Object.entries(calendarData); // Object.entries() : 객체를 배열로 바꿔 변환해주는 메서드
        // console.log(calendarData);

        // setCalendar(calendarDataEntries.map(calendarDataEntry => {
        //     const monthEntries = Object.entries(calendarDataEntry[1]); {/* 월 나옴 (연도 value값 안의 키값)*/}

        //     return <li>
        //         <h2>{calendarDataEntry[0]}</h2> {/* 연도가 나옴 (키값)*/}
        //         <ul>
        //             {
        //                 monthEntries.map(monthEntry => {
        //                     const todos = monthEntry[1];
        //                     return <li>
        //                         <h3>{monthEntry[0]}</h3>
        //                         <ul>
        //                             {
        //                                 todos.map(todo => {
        //                                     return <li>
        //                                         <h4>{todo.title}</h4>
        //                                         <div>
        //                                             <input type="checkbox" checked={todo.status === 2} />
        //                                             <div>
        //                                                 <code>{todo.content}</code>
        //                                                 <p>{todo.todoDateTime}</p>
        //                                                 <p>{todo.important}, {todo.busy}</p>
        //                                             </div>
        //                                         </div>
        //                                     </li>
        //                                 })
        //                             }
        //                         </ul>
        //                     </li>
        //                 })
        //             }
        //         </ul>
        //     </li>
        // })); 
    }, [todolistAll]);

    const modifyCancel = () => {
        setSelectedTodo(0);
    }

    const modifySubmit = async () => {
        console.log(modifyTodo);
        await ModifyTodo(modifyTodo);
        setRefresh(true);
        setSelectedTodo(0);
    }

    return (
        <PageAnimationLayout isShow={isShow} setShow={setShow}>
            <SubPageContainer>
                <div css={s.layout}>
                    {
                        selectedTodo === 0 
                        ? <BackButtonTop setShow={setShow}/>
                        : <ConfirmButtonTop onCancel={modifyCancel} onSubmit={modifySubmit} disabled={submitButtonDisabled}/>
                    }
                    <PageTitle title={MENUS.important.title} color={MENUS.important.color}/>
                    <TodoCalendar calendarData={calendarData} />
                    <RegisterTodoButton />
                </div>
            </SubPageContainer>
        </PageAnimationLayout>
    );
}

export default TodoImportant;