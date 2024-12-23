/** @jsxImportSource @emotion/react */
import { useRecoilState, useSetRecoilState } from "recoil";
import { changeCheckTodoStatus } from "../../apis/todoApis/modifyTodoApi";
import * as s from "./style";
import { refreshTodoListAtom } from "../../atoms/todolistAtom";
import { modifyTodoAtom, selectedCalendarTodoAtom } from "../../atoms/calendarAtoms";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import FullRedButton from "../FullRedButton/FullRedButton";
import { deleteTodoApi } from "../../apis/todoApis/deleteTodoApi";

function TodoBox({ todo }) {

    const importantOptions = [
        { label: "🟣" + "중요함", value: 1, },
        { label: "⚪" + "중요하지않음", value: 2, }
    ]

    const busyOptions = [
        { label: "🔴" + "급함", value: 1, },
        { label: "⚪" + "급하지않음", value: 2, }
    ]

    // 내용 눌러서 수정창 나왔을 때 위에 취소, 확인 버튼 만들기 위해 전역변수를 만듦
    const [ selectedTodo, setSelectedTodo ] = useRecoilState(selectedCalendarTodoAtom); 
    const setRefresh = useSetRecoilState(refreshTodoListAtom);
    const [ modifyTodo, setModifyTodo ] = useRecoilState(modifyTodoAtom);

    useEffect(() => {
        if(selectedTodo === todo.todoId) {
            setModifyTodo({
                ...todo,
                todoDateTime: todo.todoDateTime.replaceAll(" ", "T")
            });
        }
    }, [selectedTodo]);

    const handleCheckBoxOnChange = async (e) => {
        // changeCheckTodoStatus(todo.todoId); // props로 이미 todo를 받아오기 때문에 전역 변수의 값을 받아와도 된다
        // console.log(e.target.value);
        await changeCheckTodoStatus(e.target.value);
        setRefresh(true);
    }

    const handleSelectTodoClick = (todoId) => { // h2같은건 value를 넣어줄 수 없기 때문에 event를 받아오는 게 아닌
        setSelectedTodo(todoId);                // 바로 todoId를 받아옴, 가능하면 매개변수로 받아오는 것이 좋음
                                                // 이 함수를 외부에서 다른 곳에서 쓸 수도 있기 때문

    }

    const handleModifyChange = (e) => {
        setModifyTodo(modifyTodo => ({
            ...modifyTodo,
            [e.target.name]: e.target.value
        }));
    }

    const handleImportantSelectOnChange = (option) => {
        setModifyTodo(modifyTodo => ({
            ...modifyTodo,
            important: option.value
        }));
    }

    const handleBusySelectOnChange = (option) => {
        setModifyTodo(modifyTodo => ({
            ...modifyTodo,
            busy: option.value
        }));
    }

    const handleDeleteClick = async (todoId) => {
        // await deleteTodoApi(todo.todoId); // 매개변수로 말고 그냥 사용할 때(TodoBox에서 todo를 받아왔기 때문에)
        await deleteTodoApi(todoId);
        setRefresh(true);
        setSelectedTodo(0);
    }

    return <div css={s.todoBox}>
        <div css={s.todoTitleBox}>
            <div css={s.todoCheckBox}>
                <input type="checkbox" 
                id={todo.todoId} 
                checked={todo.status === 2} 
                onChange={handleCheckBoxOnChange}
                value={todo.todoId} />
                <label htmlFor={todo.todoId}></label> {/* htmlFor도 객체 값을 받아와야 id와 일치하게됨 */}
                {/* 라벨을 눌렀을 때 체크되게끔 input의 id 속성과 같은 걸로 설정 */}
            </div>
            <div css={s.todoTitleAndTime}>
                {
                    selectedTodo === todo.todoId 
                    ? <input type="text" name="title" onChange={handleModifyChange} value={modifyTodo.title}/>
                    : <h2 onClick={() => handleSelectTodoClick(todo.todoId)}>{todo.title}</h2>
                }
                <span>{todo.todoDateTime.slice(11)}</span>
                {/* 11만 넣으면 알아서 자른 위치부터 끝까지 나온다 */}
            </div>
        </div>
        <div css={s.todoSubBox}>
            {
                selectedTodo === todo.todoId &&
                <>
                    <div css={s.contentBox}>
                        <h3>메모</h3>
                        <textarea name="content" onChange={handleModifyChange} value={modifyTodo.content}></textarea>
                    </div>
                    <div>
                        <ReactSelect
                            onChange={handleImportantSelectOnChange}
                            styles={{
                                // control의 style은 상태값이라서 함수형태로 넣어줘야한다.
                                control: (style) => ({
                                    ...style,
                                    marginBottom: "5px",
                                    border: "none", 
                                    outline: "none",
                                    boxShadow: "none",
                                    backgroundColor: "f5f5f5",
                                    cursor: "pointer"
                                }),
                                menu: (style) => ({
                                    ...style,
                                    backgroundColor: "#f5f5f5"
                                }),
                                option: (style) => ({
                                    ...style,
                                    cursor: "pointer"
                                })
                            }}
                            options={importantOptions}
                            // value도 객체 형태로 넣어줘야한다
                            value={importantOptions.filter(option => option.value === modifyTodo.important)[0]}
                        />
                        <ReactSelect
                            onChange={handleBusySelectOnChange}
                            styles={{
                                // control의 style은 상태값이라서 함수형태로 넣어줘야한다.
                                control: (style) => ({
                                    ...style,
                                    marginBottom: "10px",
                                    border: "none", 
                                    outline: "none",
                                    boxShadow: "none",
                                    backgroundColor: "f5f5f5",
                                    cursor: "pointer"
                                }),
                                menu: (style) => ({
                                    ...style,
                                    backgroundColor: "#f5f5f5"
                                }),
                                option: (style) => ({
                                    ...style,
                                    cursor: "pointer"
                                })
                            }}
                            options={busyOptions}
                            value={busyOptions.filter(option => option.value === modifyTodo.busy)[0]}
                            // modifyTodo 안에 있는 값에 따라  selected 기본 값으로 보이는게 달라짐
                        />
                        <div css={s.deleteButton}>
                            <FullRedButton onClick={() => handleDeleteClick(todo.todoId)}>삭제하기</FullRedButton>
                        </div>
                    </div>
                </>
            }
            
        </div>
    </div>
}

function TodoDateGroup({date, todos}) {
    return <>
        <h2 css={s.dateTitle}>{date}</h2>
        <div>
            {
                todos.map(todo => <TodoBox key={todo.todoId} todo={todo}/>)
            }
        </div>
    </> 
}

function TodoMonthGroup({month, dateOfCalendarData}) {
    const entriesOfDate = Object.entries(dateOfCalendarData)

    return <>
        <h2 css={s.monthTitle}>{month}월</h2>
        <div>
            {
                entriesOfDate.map(([date, todos]) => 
                <TodoDateGroup key={date} date={date} todos={todos}/>)
            }
        </div>
    </> 
    
}

function TodoYearGroup({year, monthOfCalendarData}) {
    const entriesOfMonth = Object.entries(monthOfCalendarData);

    return <>
        <h2 css={s.yearTitle}>{year}년</h2>
        <div>
            {
                entriesOfMonth.map(([month, dateOfCalendarData]) => 
                <TodoMonthGroup key={year + month} month={month} dateOfCalendarData={dateOfCalendarData} />)
                // key값을 month만 주면 25년도일때 1월, 24년도일 때 1월 등 같은 월일 수 있어서 중복되기 때문에
                // year과 같이 써줌
            }
        </div>
    </> 
    
}

function TodoCalendar({ calendarData }) {
    const [ selectedTodo, setSelectedTodo ] = useRecoilState(selectedCalendarTodoAtom); 
    const entriesOfCalendarData = Object.entries(calendarData);

    // if(!!selectedTodo) {     //
    //     setSelectedTodo(0);  // (단 이것은 return 되기전에 바뀌는 것 - useEffect는 return 된 후(마운트 후) 바뀜)
    // }                        // 잘 고려해서 어떤걸 적용시킬지 고민해야함

    useEffect(() => {
        setSelectedTodo(0);
    }, []);

    return (
        <div css={s.layout}>
            {
                entriesOfCalendarData.map(([year, monthOfCalendarData]) => 
                <TodoYearGroup key={year} year={year} monthOfCalendarData={monthOfCalendarData}/>)
            }
        </div>
    );
}

export default TodoCalendar;