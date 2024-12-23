import { css } from "@emotion/react";

// display는 안에 있는 요소의 특성을 바꿔는 것 -> ex) inline 하면 안의 요소 특성이 모두 inline으로 바뀜
export const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

// 모바일 기준 크기
export const frame = css`
    position: relative;
    border: 5px solid #000000;
    border-radius: 40px;
    width: 375px;
    height: 812px;
    background-color: white;
    overflow: hidden;
`;

// z-index를 99로 만들어서 항상 위에 올려둠(웬만하면 99 안넘으니까)
// 위에 relative가 없으면 모든 속성이 html 기준으로 적용됨
export const topBar = css`
    position: absolute;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
`;

export const topBarCenter = css`
    border-radius: 20px;
    width: 36%;
    height: 30px;
    background-color: black;
`;

export const clock = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32%;
    font-size: 15px;
    font-weight: 600;
    cursor: default;
`;

// & *: => 본인의 자식 요소 중에서 고른다는 뜻
export const rightItem = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32%;
    & *:nth-of-type(2) {
        margin: 0px 5px;
    }
`;