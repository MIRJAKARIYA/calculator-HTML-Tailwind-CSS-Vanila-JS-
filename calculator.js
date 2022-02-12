const allInputNumbers = document.getElementsByClassName('number-input');
let backupResult = 0; //for ans button
//geting and passing inputs
for(const input of allInputNumbers){
    input.addEventListener('click',function(event){
        const inputText = this.innerText;
        const inputDisplay = getElement('input-show');
        inputDisplay.innerText = inputDisplay.innerText+inputText;
        if(inputText == '+' || inputText == '-' || inputText == '*' || inputText == '/' || inputText == '.'){
            if(isNaN(Number(inputDisplay.innerText.charAt(inputDisplay.innerText.length-2))) == true){
                inputDisplay.innerText = inputDisplay.innerText.slice(0,inputDisplay.innerText.length-1);
            }
        }
    });
};
//handling equal to button
const equalButton = getElement('equal-button');
equalButton.addEventListener('click',function(event){
    const allInputs = getElement('input-show').innerText;
    const allInputsArray = allInputs.split('');
    const result = doMath(allInputsArray);
    getElement('result-show').innerText = result;
});
//handling del button
const delButton = getElement('delete-button');
delButton.addEventListener('click',function(event){
    const inputDisplay = getElement('input-show');
    inputDisplayInnerText = inputDisplay.innerText;
    inputDisplay.innerText = inputDisplayInnerText.slice(0,-1);
});
//handling clear button
const clearButton = getElement('clear-button');
clearButton.addEventListener('click',function(event){
    const inputDisplay = getElement('input-show');
    const resultShow  = getElement('result-show');
    inputDisplay.innerText = '';
    resultShow.innerText = '';
});
//handling Ans button
const ansButton = getElement('ans-button');
ansButton.addEventListener('click',function(event){
    const inputShow = getElement('input-show');
    inputShow.innerText = backupResult;
})
//function for getting element
function getElement(id){
   const element = document.getElementById(id);
   return element;
}
//math function
function doMath(arr){
    if(isNaN(Number(arr[arr.length-1])) || arr[0] == '/' || arr[0] =='*'){
       return 'Syntax Error';  
    }
    else if(arr[0] == '-'){
        const concatTwoElement = arr[0]+arr[1];
        arr.splice(0,2,concatTwoElement);
    }
    const finalFilteredArray = filterTheArray(arr);
    const divideResult = divide(finalFilteredArray);
    const multiplicationResult = multiply(divideResult);
    const addition = add(multiplicationResult);
    const subtraction = sub(addition);
    //showing result in better way
    const result = subtraction[0].toFixed(2);
    const integerPartOfresult = Math.floor(result);
    if(result/integerPartOfresult == 1){
        backupResult = integerPartOfresult;
        return integerPartOfresult;  
    }
    else if(isNaN(result) == true){
        return 'Syntax Error'
    }
    else{
        backupResult = result;
        return result;
    }
}
//filter the array
function filterTheArray(arr){
    const newArray = [];
    for(let i = 0;i<arr.length;i++){
        if(isNaN(Number(arr[i]))==true && arr[i] != '.'){
            const holdingarray= arr.slice(0,i);
            newArray.push(holdingarray.join(''))
            newArray.push(arr[i]);
            arr.splice(0,i+1);
            i= -1;
        }
    }
    newArray.push(arr.join(''))
    return newArray;
}
// mathematical operations
// division
function divide(division){
    // console.log(division);
    for(let i = 0;i<division.length;i++){
        if(division[i] == '/'){
            const divResult = Number(division[i-1])/Number(division[i+1]);
            division.splice(i-1,3,divResult);
            i= -1;
        }
    }
    return division;
}
// multiplication
function multiply(multiplication){
    for(let i = 0;i<multiplication.length;i++){
        if(multiplication[i] == '*'){
            const mulResult = Number(multiplication[i-1])*Number(multiplication[i+1]);
            multiplication.splice(i-1,3,mulResult);
            i= -1;
        }
    }
    return multiplication;
}
// addition
function add(addition){
    for(let i = 0;i<addition.length;i++){
        if(addition[i] == '+'){
            const addResult = Number(addition[i-1])+Number(addition[i+1]);
            addition.splice(i-1,3,addResult);
            i= -1;
        }
    }
    return addition;
}
//subtraction
function sub(subtraction){
    for(let i = 0;i<subtraction.length;i++){
        if(subtraction[i] == '-'){
            const subResult = Number(subtraction[i-1])-Number(subtraction[i+1]);
            subtraction.splice(i-1,3,subResult);
            i= -1;
        }
    }
    return subtraction;
}

