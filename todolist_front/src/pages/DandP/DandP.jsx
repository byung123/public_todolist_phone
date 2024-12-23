/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const parent = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    margin: 50px auto;
    border: 1px solid #dbdbdb;
    padding: 10px;
    width: 800px;
    height: 400px;
`;
// align-items : 하나 짜리는 no-wrap이고, 두 개부터는 한 묶음 단위를 content라고 한다
// align-content : wrap을 써야 align-content를 사용할 수 있다 -> wrap을 써야 여러줄이 생기는데
//                  이러한 여러줄에 대한 정렬이 align-content이다.
// align-content를 사용하면 align-items는 사용할 수 없게 된다
// flex-wrap: wrap : 부모의 크기를 벗어나는 순간 다음줄로 이동하는 것

const child = css`
    box-sizing: border-box;
    border: 4px solid red;
    padding: 20px 40px;
    width: 150px;
    height: 50px;
    background-color: white;
    &:nth-of-type(1) {
        background-color: pink;
        align-self: flex-start;
    }
    

    &:nth-of-type(3) {
        background-color: pink;
        align-self: flex-end;
    }
   

    &:nth-of-type(5) {
        background-color: pink;
        align-self: flex-start;
    }
`;

const parent2 = css`
    display: flex;
    flex-wrap: nowrap;
    box-sizing: border-box;
    margin: 50px auto;
    border: 1px solid #dbdbdb;
    padding: 10px;
    width: 800px;
    height: 400px;
`;

const child2 = css`
    box-sizing: border-box;
    border: 4px solid blue;
    width: 300px;
    height: 100%;
    flex-shrink: 0;
    &:nth-of-type(1) {
        flex-shrink: 2;
        background-color: yellow;
    }
    &:nth-of-type(2) {
        flex-shrink: 1;
        background-color: green;
    }
    &:nth-of-type(3) {
        background-color: purple;
    }
`;
// align-self : 부모에서 정렬된 녀석중 개개인에게 위치를 따로 지정할 수 있게 해준다 - 자식한테 주는 기능임!!
// order : 각 요소의 순번을 바꿔서 -> 요소끼리 위치를 바꿀 수 있게 해줌 - defalut값은 0이다 근데 굳이 쓸 필요 없음
// 보통 flex 배치할 때 잘해주면 된다
// shrink를 사용하기 위해선 부모가 wrap이 아니어야한다 -> 부모 요소보다 자식 요소의 크기가 초과돼서 넘친
// 넓이 만큼 있을 때 flex-shrink는 넘친 부분을 서로 나눠서(비례) 얼마나 줄일지 설정하는 것

const inputBox = css`
    position: relative;
`;

const input = css`
    width: 300px;
    height: 50px;
    padding-right: 70px;
    & + button {
        position: absolute;
        top: 50%;
        right: 10px;            
        z-index: 0; 
        transform: translateY(-50%);
        background-color: pink;
    }
`;
// + : 옆에 붙어 있는 녀석
// position relative은 기준이 자기 자신이기 때문에 right와 bottom은 자기 영역 기준으로 이동된다.
// position absolute는 top: 10px을 줬을 때 부모에 position 속성이 없으면 html 기준으로 10px 떨어진다
// 부모에 없고 부모 밖의 컨테이너에 relative가 있더라도 html 기준으로 10px 떨어진다 -> 즉 무조건 부모에 position 있어야함
// position static이면 다 무시하고 html 기준으로 배치된다
// position을 쓰면 요소가 겹치는 거기 때문에 3차원으로 바뀐다 -> 그래서 z축 이동이 생기게 된다.
// z축은 px 개념이 아니라 order처럼 순번 개념이다(1,2,3)
// posiotion absolute, right:0하면 부모 기준으로 right 0돼서 안쪽으로 들어가게 된다
// z-index가 둘 다 0일 땐 코드를 뒤에 쓴 녀석이 올라온다
// translateY(-50%)해서 "기준점"으로 부터 끌어올린다 : 음수는 끌어올림

{/* 인라인 요소의 크기는 font-size 의 크기에 따라 달라진다 ex) label */} 
{/* 인라인 요소는 너비와 높이를 지정할 수 없다 */}
{/* 블록 요소는 높이와 너비를 지정할 수 있다 */}
{/* position은 가능한 안쓴다. 어떤 요소위에 무조건 올려야할 때(겹칠 때)만 사용, 왜냐 해상도에 따라 위치가 계속 달라짐 */}
function DandP(props) {
    return (
        <>
            <div css={parent}>
                <div css={child}>1</div> 
                <div css={child}>2</div> 
                <div css={child}>3</div> 
                <div css={child}>4</div> 
                <div css={child}>5</div>
                <div css={inputBox}>
                    <input type="text" css={input}/>
                    <button>OK</button>
                </div>
            </div>
            <div css={parent2}>
                <div css={child2}>1</div>
                <div css={child2}>2</div>
                <div css={child2}>3</div>
            </div>
        </>
    );
}

export default DandP;