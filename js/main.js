const initApp = () => {

    const currentValueEle = document.querySelector('.currentvalue');
    const previousValueEle = document.querySelector('.previousvalue');

    let itemArray = [];
    const equationArray = [];
    let newNumberFlag = false;

    const inputButtons = document.querySelectorAll('.number');
    inputButtons.forEach(button => {
        button.addEventListener('click', (ev) => {

            const newInput = ev.target.textContent;
            if (newNumberFlag) {
                currentValueEle.value = newInput;
                newNumberFlag = false;
            } else {
                currentValueEle.value = currentValueEle.value == 0 ? newInput : `${currentValueEle.value}${newInput}`;
            }
        });
    });

    const operatorButtons = document.querySelectorAll('.operator');
    operatorButtons.forEach((button) => {
        button.addEventListener('click', (ev) => {

            // equal sign showing
            if (newNumberFlag) {
                previousValueEle.textContent = '';
                itemArray = [];
            }

            const newOperator = ev.target.textContent;
            const currentVal = currentValueEle.value;

            // need number first
            if (!itemArray.length & currentVal == 0) return ;

            // begin new equation
            if (!itemArray.length) {
                itemArray.push(currentVal, newOperator)
                previousValueEle.textContent = `${currentVal}${newOperator}`;
                return newNumberFlag = true;
            }

            // complete equation
            if (itemArray.lengh) {
                itemArray.push(currentVal)

                const equationObj = {
                    num1: parseFloat(itemArray[0]),
                    num2: parseFloat(currentVal),
                    operator: itemArray[1]
                }

                equationArray.push(equationObj);
                const equationString = `${equationObj['num1']} {equationObj['operator']} {equationObj['num2']}`;

                const newValue = calculate(equationString, currentValueEle);

                previousValueEle.textContent = `${newValue} ${newOperator}`;

                // start new equation
                itemArray = [newValue, newOperator];
                newNumberFlag = true;
                console.log(equationArray);         
            }
        })
    })

    const clearButtons = document.querySelectorAll('.clear, .clearEntry');
    clearButtons.forEach((button) => {
        button.addEventListener('click', (ev) => {
            currentValueEle.value = 0;
            if (ev.target.classList.contains('clear')) {
                previousValueEle.textContent = '';
                itemArray = [];
            }
        });
    });

    const deleteButton = document.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        currentValueEle.value = currentValueEle.value.slice(0, -1);
    });

    const signChangeButton = document.querySelector('.signChange');
    signChangeButton.addEventListener('click', () => {
        currentValueEle.value = parseFloat(currentValueEle.value) * -1;
    });

}

document.addEventListener("DOMContentLoaded", initApp);


const calculate = (equation, currentValueEle) => {
const regex = /(^[*/=])|(\s)/g;
equation.replace(regex, '');
const divByZero = /(\/0)/.test(equation);
if (divByZero)  return currentValueEle.value = 0;
return currentValueEle.value = eval(equation);

}