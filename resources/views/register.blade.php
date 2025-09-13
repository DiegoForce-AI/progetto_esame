<html>
    <head>
        <link rel="stylesheet" href="{{ url('css/login.css') }}">
        <link rel="stylesheet" href="{{ url('css/common.css') }}">
    </head>
    <body>
        @if ($error == 'dati_mancanti')
        <section class = 'error'>Compilare tutti i campi</section>
        @elseif ($error == 'le_password_non_corrispondono')
        <section class = 'error'>Le password non corrispondono</section>
        @elseif ($error == 'nome_utente_gia_esistente')
        <section class = 'error'>Nome utente già esistente</section>
        @endif
            <main>
                <form method = 'post'>
                    @csrf
                    <label>Username <input name="username" id = 'username' value = '{{ old("username") }}'></label>
                     <label>Password <input type="password" name='password' id = 'password' value = '{{ old("password") }}'></label>
                    <label>Conferma Password <input type="password" name='conferma' id = 'conferma' value = '{{ old("conferma") }}'></label>
                    <label>&nbsp; <input type="submit" value = 'Registrati'></label>
                </form>
            </main>
            <a href="{{ url('login') }}">Login</a>
        </body>
        </html>