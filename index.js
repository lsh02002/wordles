
const 정답="APPLE";

let index = 0;
let attempts = 0;

function appStart(){
    const displaygameover=()=>{
        const div=document.createElement("div");
        div.innerText="게임이 종료되었습니다.";
        div.style="display:flex; justify-content:center; align-items: center;";
        document.body.appendChild(div);
    };

    const gameover=()=>{
        window.addEventListener("keydown", handleKeyDown);
        displaygameover();
    };

    const nextLine=()=>{
        if(attempts===6)
            return gameover();

        attempts+=1;
        index=0;
    };
   
    const handleEnterKey=()=>{ 
        let 맞은개수=0;  
        for(let i=0; i<5; i++){
            const block = document.querySelector(
                `.board-column[data-index='${attempts}${i}']`
            );
             
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            
            if(입력한_글자 === 정답_글자)
            {
                 block.style.background="#6AAA64";
                 맞은개수++;
            }

            else if (정답.includes(입력한_글자))
                block.style.background="#C95498";
            else
            {
                    block.style.color="white";
                    block.style.background="gray";
            }
        }

        if(맞은_개수===5)
        {
             gameover();
        }

        else
            nextLine();
    };


    const handleKeyDown=(event)=>{       
        const key=event.key.toUpperCase();
        const keyCode=event.keyCode;
        const thisBlock = document.querySelector(
            `.board-column[data-index='${attempts}${index}']`
            );        

        if(index===5){            
             if(event.key==="Enter") handleEnterKey();
             else return;
        }

        if(65<=keyCode && keyCode<=90){
            thisBlock.innerText = key;
            index+=1;
        }
    };

    const startTimer=()=>{
        const 시작_시간 = new Date();

        function setTime(){
            const 현재_시간=new Date();
            const 흐른_시간=new Date(현재_시간-시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            timeDiv.innerText=`${분}:${초}`;

        }

        timer=setInterval(setTime, 1000);
    }
    startTimer();
    window.addEventListener("keydown", handleKeyDown);
}

appStart();