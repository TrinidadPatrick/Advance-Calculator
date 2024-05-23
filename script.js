const keyboard_container = document.getElementById('keyboard_container');
const equation_container = document.getElementById('equation');
const result_container = document.getElementById('result');
const screen_toggler = document.getElementById('screen-toggler');

let isScreenOn = false;


const keys = ['AC', '<', '%', '/',
              '7', '8', '9', '*',
              '4', '5', '6', '-',
              '1', '2', '3', '+',
              '0', '.', '=',
             ]

let currInput = [];
let prevInput = [];
let operator = null;
let result = null
let equation = []

const compute = (key) => {
    let prevValues = Number(prevInput.join(""))
    let currValues = Number(currInput.join(""))
    switch (operator) {
        case "+":
            const sum = prevValues + currValues
            prevInput = String(sum).split("")
            result = sum     
            break;
        case "-":
            const difference = prevValues - currValues
            prevInput = String(difference).split("")
            result = difference     
            break;
        case "*":
            const average = prevValues * currValues
            prevInput = String(average).split("")
            result = average     
            break;
        case "/":
            const quotient = prevValues / currValues
            prevInput = String(quotient).split("")
            result = quotient     
            break;
    
        default:
            break;
    }
}

const setKey = (key) => {
    // Meaning a number is pressed
    if(key <= 9 && key >= 0 || key === ".")
    {
        equation.push(key)
        currInput.push(key)
        equation_container.textContent = equation.join("")
    }
    else if(key === "AC")
    {
        currInput = [];
        prevInput = [];
        operator = null;
        result = null
        equation = []
        equation_container.textContent = ''
        result_container.textContent = ''
    }
    else if(key === "%")
    {
        const percent = Number(currInput.join("")) * 0.01
        prevInput = String(percent).split("")
        result = percent
        equation = [result]
        result_container.textContent = ""
        equation_container.textContent = "= " + result

    }
    else
    {   
        let operators = '%/*-+'
        if(operators.includes(key)) //if an operator is pressed
        {   
            if(prevInput.length === 0)
            {
                equation.push(key)
                prevInput = currInput
                currInput = []
                operator = key
            }
            else
            {   
                compute()
                currInput = []
                result_container.textContent = result
                equation.push(key)
                operator = key
            }
            equation_container.textContent = equation.join("")
        }
        if(key === "=")
        {   
            compute()
            currInput = []
            equation = [result]
            result_container.textContent = ""
            equation_container.textContent = "= " + result
        }
    }
}

const setKeyboard = () => {
    keyboard_container.innerHTML = 
    keys.map((key, index)=>{
        return (
            `<button onclick="setKey('${key}')" class=" ${key === "=" ? "col-span-2 bg-orange-600 hover:bg-orange-500" : "bg-slate-600 hover:bg-slate-500"} rounded-md text-lg text-white">${key}</button>`
        )
    }).join('')
}

setKeyboard()

const togglePower = () => {
    if(isScreenOn)
    {
        screen_toggler.classList.remove("hidden")
        isScreenOn = false
    }
    else
    {
        screen_toggler.classList.add("hidden")
        isScreenOn = true
    }
}
