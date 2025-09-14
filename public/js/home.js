 //Gestione del menu a tendina del profilo utente
 document.addEventListener('DOMContentLoaded', function () {
            const btn = document.getElementById('account-btn');
            const dropdown = document.getElementById('account-dropdown');
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            });
            document.addEventListener('click', function (e) {
                if (!btn.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.style.display = 'none';
                }
            });
        });