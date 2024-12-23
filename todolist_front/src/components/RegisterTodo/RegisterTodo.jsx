/** @jsxImportSource @emotion/react */
import ReactSelect from "react-select";
import * as s from "./style";
import { useEffect, useState } from "react";
import { addTodoApi } from "../../apis/todoApis/addTodoApi";
import { useSetRecoilState } from "recoil";
import {refreshTodoListAtom } from "../../atoms/todolistAtom";

function RegisterTodo({closeModal}) {
    // window + . 누르면 이모티콘 넣을 수 있음
    const importantOptions = [
        { label: "🟣" + "중요함", value: 1, },
        { label: "⚪" + "중요하지않음", value: 2, }
    ]

    const busyOptions = [
        { label: "🔴" + "급함", value: 1, },
        { label: "⚪" + "급하지않음", value: 2, }
    ]

    const setRefresh = useSetRecoilState(refreshTodoListAtom);

    const [ todo, setTodo ] = useState({
        title: "",
        content: "",
        dateTime: "",
        important: 1,
        busy: 1
    });

    useEffect(() => {
        const parse = (value) => (value < 10 ? "0" : "") + value;

        const now = new Date();
        const year = now.getFullYear();
        const month = parse(now.getMonth() + 1);
        const day = parse(now.getDate());
        const hours = parse(now.getHours());
        const minutes = parse(now.getMinutes());

        setTodo(todo => ({
            ...todo,
            dateTime: `${year}-${month}-${day}T${hours}:${minutes}`
        }));
    }, []);

    const handleOnChange = (e) => {
        setTodo(todo => ({
            ...todo,
            [e.target.name]: e.target.value
        }));
    }

    // name 값 요소가 없기 때문에 따로 따로 handleOnchange를 만들어줘야함
    // e.target을 타고 들어와야하므로 target: 을 추가해줘야함
    const handleImportantSelectOnChange = (option) => {
        handleOnChange({target: {name: "important", value: option.value}});
    }

    // 이런 방법도 된다.
    const handleBusySelectOnChange = (option) => {
        setTodo(todo => ({
            ...todo,
            busy: option.value
        }));
        // handleOnChange({target: {name: "busy", value: option.value}});
    }

    const handleSubmitClick = () => {
        console.log(todo);
        addTodoApi(todo);
        setRefresh(true);
        closeModal();
    }

    return (
        <div css={s.layout}>
            <header>
                <button onClick={closeModal}>취소</button>
                <h2>새로운 할 일</h2>
                <button onClick={handleSubmitClick} disabled={!todo.title.trim() || !todo.content.trim()}>추가</button>
            </header>
            <main>
                <div css={s.todoDataBox}>
                    <input type="text" name="title" placeholder="제목" onChange={handleOnChange} value={todo.title}/>
                    <textarea name="content" placeholder="메모" onChange={handleOnChange} value={todo.content}></textarea>
                </div>
                <div css={s.dateSelect}>
                    <input type="datetime-local" name="dateTime" onChange={handleOnChange} value={todo.dateTime}/>
                </div>
                <div css={s.importantSelect}>
                    {/* options는 배열로 넣어줘야함 */}
                    <ReactSelect
                        onChange={handleImportantSelectOnChange}
                        styles={{
                            // control의 style은 상태값이라서 함수형태로 넣어줘야한다.
                            control: (style) => ({
                                ...style, 
                                border: "none", 
                                outline: "none",
                                boxShadow: "none"
                            })
                        }}
                        options={importantOptions}
                        // value도 객체 형태로 넣어줘야한다
                        value={importantOptions.filter(option => option.value === todo.important)[0]}
                    />
                    <div css={s.line}></div>
                    <ReactSelect
                        onChange={handleBusySelectOnChange}
                        styles={{
                            // control의 style은 상태값이라서 함수형태로 넣어줘야한다.
                            control: (style) => ({
                                ...style, 
                                border: "none", 
                                outline: "none",
                                boxShadow: "none"
                            })
                        }}
                        options={busyOptions}
                        value={busyOptions.filter(option => option.value === todo.busy)[0]}
                    />
                </div>
            </main>
        </div>
    );
}

export default RegisterTodo;