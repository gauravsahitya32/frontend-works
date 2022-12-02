let cardNum = document.getElementById('cnum');
let form = document.querySelector('form');
let button = document.getElementById('button1');
let mode = document.getElementById('mode');
let counter = 0;
let formattedNum = '', txnToken = null;

button.addEventListener('click', () => {
    let xhr = new XMLHttpRequest();
    let formData = new FormData();

    formData.append('mode', mode.value);
    formData.append('price', "5");

    xhr.responseType = 'json';
    xhr.open('POST', 'http://localhost:8083/payment/initPayment', true);

    xhr.onload = () => {
        if (xhr.status == 200) {
            txnToken = xhr.response
            console.log(txnToken);
        }
    }

    xhr.send(formData);
})

cardNum.addEventListener('change', () => {
    for (let i = 0; i < cardNum.value.length; i++) {
        if ((i + 1) % 4 == 0 && (i + 1) != 16) {
            formattedNum += cardNum.value[i] + " - ";
        }
        else {
            formattedNum += cardNum.value[i];
        }
        if ((i + 1) == 16) {
            cardNum.value = formattedNum;
            cardNum.style.textAlign = "center";
        }
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (txnToken)
        window.open('http://localhost:8083/payment/process?txntoken=' + txnToken);
})