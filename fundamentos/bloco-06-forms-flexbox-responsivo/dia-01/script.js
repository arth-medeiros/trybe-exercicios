const sendBtn = document.querySelector('#send-data');
const checkbox = document.querySelector('#termos');
const inputName = document.querySelector('#nome-completo');
const inputEmail = document.querySelector('#input-email');
const whyInput = document.querySelector('#porque-voce');

function agreesWithTerms() {
  if (checkbox.checked === false) {
    return false;
  }
  return true;
};

function checkName() {
  if (inputName.value.length < 10 || inputName.value.length > 40) {
    return false;
  }
  return true;
}

function checkEmail() {
  if (inputEmail.value.length < 10 || inputEmail.value.length > 50) {
    return false;
  }
  return true;
}

function checkWhy() {
  if (whyInput.value.length > 500) {
    return false;
  }
  return true;
}

function isFormValid(event) {
  let isNameValid = checkName();
  let isEmailValid = checkEmail();
  let isWhyValid = checkWhy();
  if (isNameValid === false || isEmailValid === false || isWhyValid === false) {
    alert('Dados Inválidos');
    event.preventDefault();
    return;
  }
  if (agreesWithTerms() === false) {
    alert('É necessário concordar com o compartilhamento de imagens da viagem.');
    event.preventDefault();
    return;
  }
  alert('Dados enviados com sucesso! Obrigado por participar do concurso TrybeTrip.');
}

sendBtn.addEventListener('click', isFormValid);
