function getValues() {
  const inputEmail = document.getElementById('header-email');
  const inputPassword = document.getElementById('header-password');
  if (inputEmail.value === 'tryber@teste.com' && inputPassword.value === '123456') {
    inputEmail.value = '';
    inputPassword.value = '';
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}

const headerButton = document.getElementById('header-button');
headerButton.addEventListener('click', getValues);

const submitButton = document.getElementById('submit-btn');
const checkbox = document.getElementById('agreement');
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
});

function createNameField(form) {
  const nameField = document.createElement('h3');
  nameField.innerText = `Nome: ${document.getElementById('input-name').value}
   ${document.getElementById('input-lastname').value}`;
  form.appendChild(nameField);
}

function createEmailField(form) {
  const emailField = document.createElement('h3');
  emailField.innerText = `Email: ${document.getElementById('input-email').value}`;
  form.appendChild(emailField);
}

function createHouseField(form) {
  const houseField = document.createElement('h3');
  houseField.innerText = `Casa: ${document.getElementById('house').value}`;
  form.appendChild(houseField);
}

function createFamilyField(form) {
  const familyField = document.createElement('h3');
  familyField.innerText = `Família:
   ${document.querySelector('input[name="family"]:checked').value}`;
  form.appendChild(familyField);
}

function getCheckedSubjects(list) {
  const subs = [];
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].checked) {
      subs.push(list[i].name);
    }
  }
  const concatenatedSubs = subs.join(', ');
  return concatenatedSubs;
}

function createSubjectField(form) {
  const subjects = document.getElementsByClassName('subject');
  const checkedSubjects = getCheckedSubjects(subjects);
  const subjectField = document.createElement('h3');
  subjectField.innerText = `Matérias: ${checkedSubjects}`;
  form.appendChild(subjectField);
}

function createAvalField(form) {
  const avalField = document.createElement('h3');
  avalField.innerText = `Avaliação: ${document.querySelector('input[name="rate"]:checked').value}`;
  form.appendChild(avalField);
}

function createObsField(form) {
  const obsField = document.createElement('h3');
  obsField.innerText = `Observações: ${document.getElementById('textarea').value}`;
  form.appendChild(obsField);
}

function createForm(parent) {
  const newForm = document.createElement('form');
  newForm.setAttribute('id', 'form-data');
  createNameField(newForm);
  createEmailField(newForm);
  createHouseField(newForm);
  createFamilyField(newForm);
  createSubjectField(newForm);
  createAvalField(newForm);
  createObsField(newForm);
  parent.appendChild(newForm);
}

submitButton.addEventListener('click', (event) => {
  event.preventDefault();
  const container = document.getElementById('form-container');
  createForm(container);
  container.firstElementChild.style.display = 'none';
});

const counterSelector = document.getElementById('counter');
let maxChars = 500;
counterSelector.innerHTML = maxChars;
document.getElementById('textarea').addEventListener('input', () => {
  maxChars = 500 - document.getElementById('textarea').value.length;
  counterSelector.innerHTML = maxChars;
});
