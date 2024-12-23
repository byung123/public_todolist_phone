import { css } from "@emotion/react";

export const searchInputBox = css`
    position: relative;
    display: flex;
    margin-bottom: 10px;
    width: 100%;

    /* 아이콘 */
    /* svg : 코드화해서 아이콘 이미지를 만든것 */
    & > svg {
        position: absolute;
        top: 50%;
        left: 7px;
        transform: translateY(-50%);
        font-size: 20px;
        color: #666666;
    }

    /* input */
    & > input {
        outline: none;
        border: none;
        border-radius: 8px;
        padding: 0px 10px 0px 35px;
        width: 100%;
        height: 35px;
        background-color: #dddddd;
        transition: width 0.5s ease-in-out;
        
        &:focus {
            width: 80%;
        }

        /* 버튼 */
        &:focus + button {
            width: 20%;
        }
    }

    & > button {
        transition: width 0.5s ease-in-out;
        padding: 0;
        width: 0;
        white-space: nowrap;
        overflow: hidden;
    }
`;
// opacity : 투명도를 뜻함, 1이면 완전히 보이는것, 0이면 아예 안보이는 것

