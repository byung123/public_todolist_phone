/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";

function PageAnimationLayout({ isShow, children }) {
    
    // useEffect(() => {
    //     setShow(true);
    //     // return () => {
    //     //     setShow(false); // 언마운트때 할 동작
    //     // }
    // }, []);

    return (
        <div css={s.layout(isShow)}>
            { children }
        </div>
    );
}

export default PageAnimationLayout;