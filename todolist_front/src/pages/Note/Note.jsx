import React, { useEffect, useState } from 'react';
import MainContainer from '../../components/MainContainer/MainContainer';

function Note(props) {

    const [ inputText, setInputText ] = useState("");
    
    const handleChange = (e) => {
        setInputText(e.target.value);
    }

    const handleOKclick = () => {
        if(inputText.trim() === "") {
            alert("메모를 입력하세요.");
            return;
        }
        console.log("메모 : " + inputText);
        setInputText("");
    }

    const handleKeyDown = (e) => {
        if(e.keyCode === 13 && e.shiftKey === true) {
            setInputText(...inputText + `\n`);
        }

        if(e.keyCode === 13 && e.shiftKey === false) {
            if(inputText.trim() === "") {
                alert("메모를 입력하세요.");
                return;
            }
            console.log("메모 : " + inputText);
            setInputText("");
            console.log(e);
        }
    }

    return  (
            <MainContainer>
                <div>
                    <h3>메모</h3>
                    <textarea
                    type="textarea" 
                    onChange={handleChange} 
                    value={inputText} 
                    onKeyDown={handleKeyDown}/>
                    <div>
                        <button onClick={handleOKclick}>확인</button>
                    </div>
                </div>
            </MainContainer>
    );
}

export default Note;