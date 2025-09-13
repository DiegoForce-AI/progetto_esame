<html>
    <head>
        <script src = '{{ url("js/home.js") }}'></script>
        <link rel="stylesheet" href="{{ url('css/home.css') }}">
        <link rel="stylesheet" href="{{ url('css/common.css') }}"></head>
    <body>
    <nav>
    <a href="{{ url('home') }}">Home</a>
    <a href="{{ url('logout') }}">Logout</a>
    </nav>
    <section>
    <h2>Benvenuto, {{$username}}</h2>
    </section>
    <section>
    <h3 class = 'separated'>Raccolte</h3>
    <div id = 'collections'></div>
    <div id = 'add-collection-div'>
        Aggiungi <input id="add-collection"> <button id = 'add-collection-btn'>Ok</button>
    </div>
    </section>
    </body>
</html>