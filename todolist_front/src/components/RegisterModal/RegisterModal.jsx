/** @jsxImportSource @emotion/react */
import * as s from "./style";
import ReactModal from 'react-modal';
import { useRecoilState } from 'recoil';
import { registerModalAtom } from '../../atoms/modalAtoms';
import { useState } from "react";
import RegisterTodo from "../RegisterTodo/RegisterTodo";
ReactModal.setAppElement("#root");

function RegisterModal({ containerRef }) {
    const [ isOpen, setOpen ] = useRecoilState(registerModalAtom);
    const [ animation, setAnimation ] = useState("registerModalContentOpen");

    const closeModal = () => {
        setAnimation("registerModalContentClose");
        setTimeout(() => {
            setAnimation("registerModalContentOpen");
            setOpen(false);
        }, 500); // 애니메이션이 끝나기전에 모달 창을 없앤다.
    }

    return (
        <ReactModal
            style={{ // overlay는 container 전체영역을 의미
                overlay: {
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    zIndex: "50"
                },
                content: {
                    inset: "auto 0 0",
                    boxSizing: "border-box",
                    borderRadius: "10px",
                    padding: "0",
                    width: "100%",
                    height: "80%",
                    animation: `${animation} 0.6s 1`,
                }
            }}
            isOpen={isOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            parentSelector={() => containerRef.current} // containerref.current를 분모로 선택하라는 뜻
        >
            <RegisterTodo closeModal={closeModal}/>
        </ReactModal>
    );
}

export default RegisterModal;