import { css } from "@emotion/react";

export const layout = css`
    flex-grow: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const yearTitle = css`
    box-sizing: border-box;
    border-bottom: 2px solid #bbbbbb;
    padding: 5px;
    font-size: 20px;
    font-weight: 600;
    color: #999999;
    cursor: default;
`;

export const monthTitle = css`
    box-sizing: border-box;
    border-bottom: 1px solid #bbbbbb;
    padding: 5px 10px;
    font-size: 18px;
    font-weight: 600;
    color: #999999;
    cursor: default;
`;

export const dateTitle = css`
    box-sizing: border-box;
    padding: 5px 10px;
    font-size: 18px;
    font-weight: 600;
    color: #999999;
    cursor: default;
`;

export const todoBox = css`
    box-sizing: border-box;
    border-bottom: 1px solid #dbdbdb;
    padding: 5px 10px;
    font-size: 18px;
    font-weight: 600;
    color: #999999;
`;

export const todoTitleBox = css`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
`;

export const todoTitleAndTime = css`
    width: 92%;
    display: flex;
    justify-content: space-between;
    & > h2 {
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 5px;
    }
    /* 내용이 넘치면 안보이게? 
    text-overflow: ellipsis : 뒤에 내용이 넘치면 ...으로 표시됨
    */

    & > input {
        box-sizing: border-box;
        margin-bottom: 5px;
        outline: none;
        border: none;
        padding: 0px 3px;
        width: 100%;
        background-color: #f5f5f5;
        overflow-y: auto;
        resize: none; /* 사이즈 변경 못하게 */
        color: #777777;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;



export const todoCheckBox = css`
    padding-right: 5px;

    & > input[type="checkbox"] {
        display: none;
    }

    & > label {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        margin-top: 5px;
        /* dotted: 점선 */
        /* dashed : 길게 그렸다가 점 반복하는 형식 */
        border: 1px dashed #c1c1c1;
        border-radius: 50px;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    & > input[type="checkbox"]:checked + label::after {
        content: "";
        box-sizing: border-box;
        border-radius: 50%;
        width: 14px;
        height: 14px;
        background-color: #7a7a7a;
    }
`;

export const todoSubBox = css`
    display: flex;
    flex-direction: column;
    padding-left: 28px;
`;

export const contentBox = css`
    & > h3 {
        cursor: default;
    }

    & > textarea {
        box-sizing: border-box;
        margin-bottom: 5px;
        outline: none;
        border: none;
        padding: 0px 3px;
        width: 100%;
        height: 60px;
        background-color: #f5f5f5;
        overflow-y: auto;
        resize: none; /* 사이즈 변경 못하게 */
        color: #777777;
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const deleteButton = css`
    padding-right: 28px;
`;