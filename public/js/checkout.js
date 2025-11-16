const BASE_URL = 'http://127.0.0.1:8000'

// try catch per gestire eventuali errori imprevisti
try {
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;
            fetch(BASE_URL + '/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: new URLSearchParams(new FormData(form))
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                    return;
                }
                return response.text();
            })
            .then(html => {
                if (html) {
                    document.body.innerHTML = html;
                    // Reinserisco lo script di redirect se presente
                    const redirectScript = document.createElement('script');
                    redirectScript.innerHTML = "setTimeout(function(){window.location.href='" + BASE_URL + "/home';},2000);";
                    document.body.appendChild(redirectScript);
                }
            })
            .catch(() => {
                alert('Errore di rete.');
                if (submitBtn) submitBtn.disabled = false;
            });
        });
    }
} catch (error) {
    console.error('Errore durante il checkout:', error);
}
