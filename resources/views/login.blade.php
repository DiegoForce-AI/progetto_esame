<html>
    <head>
        <link rel="stylesheet" href="{{ url('css/login.css') }}">
        <link rel="stylesheet" href="{{ url('css/common.css') }}">
    </head>
    <body>
        @if ($error == 'dati_mancanti')
        <section class = 'error'>Compilare tutti i campi</section>
        @elseif ($error == 'credenziali_non_valide')
        <section class = 'error'>Credenziali non valide</section>
        @endif
            <main>
                <form method = 'post'>
                    @csrf
                    <label>Username <input name="username" id = 'username' value = '{{ old("username") }}'></label>
                     <label>Password <input type="password" name='password' id = 'password'></label>
                    <label>&nbsp; <input type="submit" value = 'Accedi'></label>
                </form>
            </main>
            <a href="{{ url('register') }}">Registrati</a>
        </body>
        </html>