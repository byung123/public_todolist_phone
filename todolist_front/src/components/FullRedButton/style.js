import { css } from "@emotion/react";

// 전역 global에도 설ㅇ정한 게 있기 때문에
// 디테일하게 안함
export const layout = css`
    width: 100%;
    height: 40px;
    color: #ff1e1e;

    &:active {
        color: #ff9191;
    } 
`;