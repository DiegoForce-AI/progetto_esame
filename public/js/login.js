document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');
  const msg = document.getElementById('msg');
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  username.addEventListener('input', checkInputs);
  password.addEventListener('input', checkInputs);
  checkInputs();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.textContent = '';
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': form.querySelector('input[name=_token]').value
      },
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = data.redirect;
        } else {
          msg.textContent = data.error;
        }
      })
      .catch((error) => {
        console.error('Error: ', error)
        msg.textContent = 'Errore di connessione.';
      });
  });
});

function checkInputs() {
  const submitBtn = document.getElementById('submit');

  if (username.value.trim() && password.value) {
    submitBtn.disabled = false;
    submitBtn.classList.add('opacity: 0.5');
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove('enable');
  }
}