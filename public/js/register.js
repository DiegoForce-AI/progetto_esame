//Validazione lato client della registrazione dell'utente
const BASE_URL = 'http://127.0.0.1:8000';

  const msgElem = document.getElementById('msg');
  document.getElementById('username').addEventListener('input', function () {
    if (msgElem.textContent) {
      msgElem.textContent = '';
    }
  });
  document.getElementById('password').addEventListener('input', function () {
    if (msgElem.textContent) {
      msgElem.textContent = '';
    }
  });
  document.getElementById('conferma').addEventListener('input', function () {
    if (msgElem.textContent) {
      msgElem.textContent = '';
    }
  });
  document.querySelector('form').addEventListener('submit', function (e) {
    let valid = true;
    let msg = '';
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const conferma = document.getElementById('conferma').value;
    const regexLower = /[a-z]/;
    const regexUpper = /[A-Z]/;
    const regexNumber = /[0-9]/;
    const regexSpecial = /[\W_]/;
    if (!username || !password || !conferma) {
      valid = false;
      msg = 'Compilare tutti i campi';
    } else if (password !== conferma) {
      valid = false;
      msg = 'Le password non corrispondono';
    } else if (
      password.length < 8 ||
      !regexLower.test(password) ||
      !regexUpper.test(password) ||
      !regexNumber.test(password) ||
      !regexSpecial.test(password)
    ) {
      valid = false;
      msg = 'La password deve essere più lunga di 8 caratteri e contenere almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale';
    }
    if (!valid) {
      e.preventDefault();
      document.getElementById('msg').textContent = msg;
    }
  });


