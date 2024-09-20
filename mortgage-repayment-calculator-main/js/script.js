// 変数定義--------------------------------------------------------------

let inputText = document.querySelectorAll('label p input');

let radioButton = document.getElementsByName('type');

let radioBox = document.getElementById('radio-box');

let button = document.querySelector('.button');

let label = document.querySelectorAll('label');

let monthlyRepayment = document.getElementById('monthly-repayment');
let totalRepayment = document.getElementById('total-repayment');

let resultEmpty = document.querySelector('.result-empty');
let resultCompleted = document.querySelector('.result-completed');

// ---------------------------------------------------------------------

// テキストボックスのホバーイベント

for (let m = 0; m < inputText.length; m++) {
    let targetP = inputText[m].closest('p');
    targetP.addEventListener('mouseover', function(event) {
        event.target.classList.add('border-color-navy');
    });
    targetP.addEventListener('mouseleave', function(event) {
        event.target.classList.remove('border-color-navy');
    });
}

// テキストボックスの選択イベント

for (let j = 0; j < inputText.length; j++) {
    inputText[j].addEventListener('focus', function(event) {
        let targetSpan = '';
        if (event.target.previousElementSibling) {
            targetSpan = event.target.previousElementSibling;
        } else {
            targetSpan = event.target.nextElementSibling;
        }
        targetSpan.classList.add('focus-span');
        defaultSpan = targetSpan;

        let targetP = event.target.closest('p');
        targetP.classList.add('focus-p');
        defaultP = targetP;

        event.target.value = event.target.value.replace(/,/g, '');
    });

    // フォーカスが外れたときのイベント

    inputText[j].addEventListener('blur', function(event) {
        let targetSpan = '';
        if (event.target.previousElementSibling) {
            targetSpan = event.target.previousElementSibling;
        } else {
            targetSpan = event.target.nextElementSibling;
        }
        targetSpan.classList.remove('focus-span');

        let targetP = event.target.closest('p');
        targetP.classList.remove('focus-p');

        if (event.target.value <= 0 || isNaN(event.target.value)) {
            event.target.value = '';
        } else {
            event.target.value = Number(event.target.value).toLocaleString();
        }
    });
}

// ラジオボタンのチェックイベント

let defaultLabel = '';
for (let i = 0; i < radioButton.length; i++) {
    radioButton[i].addEventListener('change', function(event) {
        if (defaultLabel !== '') {
        defaultLabel.classList.remove('checked');
        }
        let targetLabel = event.target.closest('label');
            targetLabel.classList.add('checked');
            defaultLabel = targetLabel;
    });
}

// ボタンのクリックイベント

button.addEventListener('click', function() {

    // 結果画面を初期化
    resultEmpty.classList.remove('display-none');
    resultCompleted.classList.add('display-none');

    // 空のアラートを全て初期化

    let emptyAlertInitial = document.querySelectorAll('.empty-alert');
    for (let l = 0; l < emptyAlertInitial.length; l++) {
        emptyAlertInitial[l].remove();
    }

    let inputBoxInitial = document.querySelectorAll('label p');
    for (let m = 0; m < inputBoxInitial.length; m++) {
        inputBoxInitial[m].classList.remove('border-color-red');
    }

    inputText[0].previousElementSibling.classList.remove('background-color-red');
    inputText[1].nextElementSibling.classList.remove('background-color-red');
    inputText[2].nextElementSibling.classList.remove('background-color-red');

    // 空の項目がある場合

    for (k = 0; k < inputText.length; k++) {

        if (!inputText[k].value) {

            let emptyAlert = document.createElement('p');
            emptyAlert.innerHTML = 'This field is required';
            emptyAlert.classList.add('empty-alert');
    
            let inputBox = inputText[k].closest('p');
    
            label[k].appendChild(emptyAlert);

            inputBox.classList.add('border-color-red');

            if (k == 0) {
                inputText[k].previousElementSibling.classList.add('background-color-red');
            }
            if (k !== 0) {
                inputText[k].nextElementSibling.classList.add('background-color-red');
            }
        }
    }

    if (!radioButton[0].checked && !radioButton[1].checked) {

        let emptyAlert = document.createElement('p');
        emptyAlert.innerHTML = 'This field is required';
        emptyAlert.classList.add('empty-alert');
        radioBox.appendChild(emptyAlert);
    }

    // すべて入力されている場合

    // 抵当の計算

    let month = inputText[1].value.replace(/,/g, '') * 12;
    let amount = inputText[0].value.replace(/,/g, '');
    let rate = inputText[2].value.replace(/,/g, '') / 12 / 100;

    if (month == 0 || amount == 0 || rate == 0 || (!radioButton[0].checked && !radioButton[1].checked)) {
    } else {
        let culculation = (amount * rate * Math.pow(1 + rate, month)) / (Math.pow(1 + rate, month) - 1);
        monthlyRepayment.innerHTML = (Math.floor(culculation * 100) / 100).toLocaleString();
        console.log(culculation);

        totalRepayment.innerHTML = (Math.floor((culculation * month) * 100) / 100).toLocaleString();
        console.log(totalRepayment);

        resultEmpty.classList.add('display-none');
        resultCompleted.classList.remove('display-none');
    }
});


// メディアクエリ

let mediaQuery = window.matchMedia('(max-width:540px)');
if (mediaQuery.matches) {
    let resultEmptyP = document.querySelector('.result-empty .right-gray');
    console.log(resultEmptyP);
    resultEmptyP.innerHTML = 'Complete the form and click “calculate repayments” to see what your monthly repayments would be.'
}