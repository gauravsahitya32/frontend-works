let phone = document.getElementById('phone');
let msgBox = document.getElementById('msgBox');

phone.addEventListener('keyup', () => {
    msgBox.innerText = "";
    msgBox.innerText = "Your entered text is " + phone.value;
});
