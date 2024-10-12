let boxes=document.querySelectorAll(".box");
let btn=document.querySelector("#btn");
let newBtn=document.querySelector("#new-btn");
let container=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0=true;
const winPatterns=[
    [0,1,2],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [2,4,6],
    [6,7,8],
    [0,4,8],
    [0,3,6],
];
const resetGame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    container.classList.add("hide");
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
       
        if(turn0){
          box.innerText="O";
          box.classList.add("o-color");
          turn0=false;

        }
        else{
            box.innerText="X";
            box.classList.add("x-color");
            turn0=true;
        }
        box.disabled=true;
        count++;

        let isWinner=checkWinner();
        if (count==9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText="Game was a draw";
    container.classList.remove("hide");
    disableBoxes();
};

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.remove("o-remove","x-color");
    }
}


const showWinner=(winner)=>{
    msg.innerText=  `Congratulations, ${winner} you won!`;
    container.classList.remove("hide");
    disableBoxes();
}

const checkWinner=()=>{
   for(let pattern of winPatterns){
   
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val==pos2val && pos2val==pos3val){
                
                showWinner(pos1val);
            }
        }
   }
};
newBtn.addEventListener("click",resetGame);
btn.addEventListener("click",resetGame);
