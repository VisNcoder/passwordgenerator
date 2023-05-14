const slider=document.querySelector("[datalength-slider]");
const passlengthno=document.querySelector("[data-lengthno]");

const display=document.querySelector(".display");

const copybtn=document.querySelector("[data-copy]");

const copymsg=document.querySelector(".buttt");

const upper=document.querySelector("#uppercase");

const lower=document.querySelector("#lowercase");
const number=document.querySelector("#number");
const symbol=document.querySelector("#Symbols");

const indicator=document.querySelector("[dat-indicator]");

const generatebutt=document.querySelector(".generateButton");

const allcheckbox=document.querySelectorAll("input[type=checkbox]");

const symbols= `~)-+=-*][)(_%$#@!`;

//////////// INITIAL CONDITIONS //////////////

let password="";
let passwordlength=10;
let checkcount=0;
////////  circle     ///////
handleslider();

function handleslider(){
    slider.value=passwordlength;
    passlengthno.innerText=passwordlength;
    const min=slider.min;
    const max=slider.max;
    slider.style.backgroundSize=((passwordlength-min) * 100 /(max-min)) + "% 100%"

}

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow= `0px 0px 12px  1px ${color}`;

}

function getrandominteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;

}

function generateRAndomNumber(){
    return getrandominteger(0,9);
}

function generatelowercase(){
    return String.fromCharCode(getrandominteger(97,123));
}

function generateUppercase(){
    return String.fromCharCode(getrandominteger(65,91));
}

function generateSymbol(){
   const index= getrandominteger(0,symbols.length);
   return symbols.charAt(index);
}

function calcstrength(){

    let hasupper=false;
    let haslower=false;
    let hasnumber=false;
    let hassymbol=false;

    if(upper.checked) hasupper=true;
    if(lower.checked) haslower=true;
    if(number.checked) hasnumber=true;
    if(symbol.checked) hassymbol=true;

    if(hasupper && haslower && (hasnumber || hassymbol) && passwordlength>=8){
        console.log("buddy");
        setIndicator("#0f0");
       
    }
    else if(
        (haslower || hasupper) &&
        (hasnumber || hassymbol) &&
        passwordlength>=6
    ){
        setIndicator("#ff0");
    }
    else{
        setIndicator("#f00");
    }
}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(display.value);
        copymsg.innerText="Copied";

    }
    catch(e){
        copymsg.innerText="failed";

    }

    copymsg.classList.add("active");

    setTimeout( () => {
        copymsg.classList.add("notactive");
     } , 1000);
     
}

function shufflepassword(array){
    // FISHER YATES METHOD ///

    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}

function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkcount++;
    });

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }
}

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxchange);
})

slider.addEventListener('input', (e)=>{
    passwordlength=e.target.value;
    handleslider();
})

copybtn.addEventListener('click',()=>{
    if(display.value){
        copycontent();
    }

});

generatebutt.addEventListener('click',()=>{
    if(checkcount<=0) return;

    if(passwordlength<checkcount){
        passwordlength=checkcount;
        handleslider();
    }



    password="";

    // if(upper.checked){
    //     password=generateUppercase();
    // }

    // if(lower.checked){
    //     password=generatelowercase();
    // }

    // if(number.checked){
    //     password=generateRAndomNumber();

    // if(symbol.checked){
    //     password=generateSymbol();
    // }

    let funcarr=[];

    if(upper.checked)
        funcarr.push(generateUppercase);

    if(lower.checked)
        funcarr.push(generatelowercase);

    if(number.checked)
        funcarr.push(generateRAndomNumber);   
        
    if(symbol.checked)
        funcarr.push(generateSymbol);
       
    for(let i=0;i<funcarr.length;i++){
        password+=funcarr[i]();
    }

    for(let i=0; i < passwordlength-funcarr.length ;i++){
        let ranindex=getrandominteger(0, funcarr.length);
        password+=funcarr[ranindex]();
    }

    password=shufflepassword(Array.from(password));

    display.value=password;
    calcstrength();

});