'use strict';

let numberButtons=document.querySelectorAll('[data-number]');
let operationButtons=document.querySelectorAll('[data-operation]');
let previousOperandTextElement=document.querySelector('[data-previous-operand]');
let currentOperandTextElement=document.querySelector('[data-current-operand]');
let equalsButton=document.querySelector('[data-equals]');
let allClearButton=document.querySelector('[data-all-clear]');
let deleteButton=document.querySelector('[data-delete]');

let previousNumber='';
let currentNumber='';
let previousOperand='';
let flag=0;

function calculate(previousNumber,currentNumber,operation)
{
    let val;
    if(operation==='+')
    {
       val=Number(previousNumber)+Number(currentNumber);
    }
    else if(operation==='*')
    {
        val=Number(previousNumber)*Number(currentNumber);
    }
    else if(operation==='÷')
    val=Number(previousNumber)/Number(currentNumber);
    else
    val=Number(previousNumber)-Number(currentNumber);
    return val;
}

function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

for(let i=0;i<numberButtons.length;i++)
{
    numberButtons[i].addEventListener('click',function(){
        let numeric=numberButtons[i].textContent;
        if(flag==1)
        {
         currentNumber='';
         flag=0;
        }
        if(numeric==='.')
        {
           if(currentNumber.includes('.')===false)
          {
            currentNumber=currentNumber+numeric;
            currentOperandTextElement.textContent=thousands_separators(currentNumber);
          }
        }
        else
        {
            if(numeric!=='0')
            {
            currentNumber=currentNumber+numeric;
            currentOperandTextElement.textContent=thousands_separators(currentNumber);
            }
            else
            {
                if(currentNumber.length===0)
                {
                  currentNumber=currentNumber+numeric;
                  currentOperandTextElement.textContent=thousands_separators(currentNumber);
                  currentNumber='';
                }
                else
                {
                    currentNumber=currentNumber+numeric;
                    currentOperandTextElement.textContent=thousands_separators(currentNumber);
                }
            } 
        }
        
    });
}


for(let i=0;i<operationButtons.length;i++)
{
    operationButtons[i].addEventListener('click',function(){
        let operation=operationButtons[i].textContent;
        if(previousOperand==='')
        {
            if(currentNumber==='')
            {
                previousOperandTextElement.textContent=0+operation;
                previousNumber=0;
                currentNumber='';
                currentOperandTextElement.textContent=thousands_separators(currentNumber);
                previousOperand=operation;
                
            }
            else
            {
                if(isNaN(Number(currentNumber))==false)
                {
                previousOperandTextElement.textContent=thousands_separators(currentNumber)+operation;
                previousNumber=currentNumber;
                currentNumber='';
                currentOperandTextElement.textContent=thousands_separators(currentNumber);
                previousOperand=operation;
                }
            }
        }
        else
        {
            if(currentNumber!=='')
            {
                if(isNaN(Number(currentNumber))==false)
                {
                 let ans=calculate(previousNumber,currentNumber,previousOperand);
                 previousOperandTextElement.textContent=thousands_separators(ans)+operation;
                 previousNumber=ans;
                 currentNumber='';
                 currentOperandTextElement.textContent=thousands_separators(currentNumber);
                 previousOperand=operation;
                }
            }
        }
    });
}

equalsButton.addEventListener('click',function(){
  if(currentNumber!=='')
  {
      if(previousNumber!=='')
      {
        if(isNaN(Number(currentNumber))==false)
        {
      let ans=calculate(previousNumber,currentNumber,previousOperand);
      previousOperandTextElement.textContent='';
      previousNumber='';
      previousOperand='';
      currentOperandTextElement.textContent=thousands_separators(ans);
      currentNumber=ans;
      flag=1;
        }
      }
  }
  else
  {
      let ans=previousNumber;
    previousOperandTextElement.textContent='';
    previousNumber='';
    previousOperand='';
    currentOperandTextElement.textContent=thousands_separators(ans);
    currentNumber=ans;
    flag=1;
  }
});

allClearButton.addEventListener('click',function(){
  
    previousNumber='';
    currentNumber='';
    previousOperand='';
    currentOperandTextElement.textContent=thousands_separators(currentNumber);
    previousOperandTextElement.textContent=thousands_separators(previousNumber);
});

deleteButton.addEventListener('click',function(){
    
    currentNumber=currentNumber.slice(0,-1);
    currentOperandTextElement.textContent=thousands_separators(currentNumber);
});