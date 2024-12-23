
import { css } from "@emotion/react";

export const reset = css`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
    * {
        font-family: "Noto Sans KR";
        font-weight: 400;
        font-size: 16px;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: #555;
    }

    h1, h2, h3, ul, p {
        margin: 0;
        padding: 0;
    }

    ul, ol {
        list-style-type: none; // 목록 앞에 마커 모양 지정
    }

    button {
        border: none;
        padding:5px 10px;
        color: #087fff;
        background-color: transparent;
        cursor: pointer;
    }

    button:active {
        color: #087fff40;
        background-color: transparent;
    }

    button:disabled {
        color: #087fff40;
        background-color: transparent;
        cursor: default;
    }

    /* @keyframes registerModalOverlay {
        from {
            opacity: 0;
        }
        to {

        }
    }
    // 구글 : opacity : 불투명도(투명도의 반대) */

    // css에서 animation 적용을 디테일하게 만들 수 있는(영역 구분지어서 할 수 있게 만들어주는) 어노테이션
    @keyframes registerModalContentOpen {
        from {
            inset: auto 0 -650px;
        }
        to {
            inset: auto 0 0;
        }
    }

    @keyframes registerModalContentClose {
        from {
            inset: auto 0 0;
        }
        to {
            inset: auto 0 -650px;
        }
    }
`;