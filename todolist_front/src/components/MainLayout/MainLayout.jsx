/** @jsxImportSource @emotion/react */
import { Children, useEffect, useState } from "react";
import * as s from "./style";
import { IoCellularSharp } from "react-icons/io5";
import { IoIosWifi, IoIosBatteryFull } from "react-icons/io";
import RegisterModal from "../RegisterModal/RegisterModal";
import Note from "../../pages/Note/Note";
import { Route, Routes } from "react-router-dom";

// 컴포넌트는 무조건 props 만을 매개변수로 받아올 수 있다. props는
{/* <MainLayout props={props} /> */}
// props를 비구조 할당으로 children이란 키 값을 가져옴 => 
function MainLayout({children}) {
    const [ clock, setClock ] = useState("0:00");

    // 마운트 때 동작하는 것 useEffect 즉, 리턴(마운트)이 일어나고 난 후 실행되는 것
    // 시점 : 마운트 되는 시점 + 의존성 변수가 바뀌는 시점
    // 최초의 한 번은 무조건 실행됨.
    // []이란 거 자체가 없으면 랜더링 될 때마다 매번 동작한다는 뜻
    useEffect(() => {
        setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
            setClock(`${hours}:${minutes}`);
        }, 1000);
    }, []);
    // setinterval : 정한 시간이 지나면(매초마다) 매번 실행시켜라!
    // toLocaleTimeString : 현지 위치까지 생각해서 시간을 가져옴
    // slice -> '오전 9:47:00' 에서 3번 인덱스부터 7번 인덱스 전까지 문자열 추출
    // 근데 이러면 시간이 10시 넘을때 인덱스가 하나 더 늘어버려서
    // 그냥 시간 부분과 분단위 부분을 나눠서 들고옴

    //return 값이 나오는 시점을 마운트라고 함
    return (
        <div css={s.layout}>
            <div css={s.frame}>
                <div css={s.topBar}>
                    <div css={s.clock}>{clock}</div>
                    <div css={s.topBarCenter}></div>
                    <div css={s.rightItem}><IoCellularSharp /><IoIosWifi /><IoIosBatteryFull /></div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default MainLayout;