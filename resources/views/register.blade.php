<html>

<head>
    <link rel="stylesheet" href="{{ url('css/login.css') }}">
    <link rel="stylesheet" href="{{ url('css/common.css') }}">
    <script src="{{ url('js/register.js') }}" defer></script>
</head>

<body>
    <main>
        <form method='post'>
            @csrf
            <label>Username <input name="username" id='username' value='{{ old("username") }}'></label>
            <label>Password <input type="password" name='password' id='password' value='{{ old("password") }}'></label>
            <label>Conferma Password <input type="password" name='conferma' id='conferma'
                    value='{{ old("conferma") }}'></label>
            <label>&nbsp; <input type="submit" value='Registrati'></label>
            <p id="msg"></p>
        </form>
    </main>
    <a href="{{ url('login') }}">Login</a>
</body>

</html>