<html>

<head>
    <link rel="stylesheet" href="{{ url('css/home.css') }}">
    <link rel="stylesheet" href="{{ url('css/common.css') }}">
    <script src ='{{ url("js/home.js") }}' defer></script>
</head>

<body>
    <nav>
        <a href="#"><img src="assets/logo.svg" alt="Apple Logo"></a>
        <a href="#">Store</a>
        <a href="#">Mac</a>
        <a href="#">iPad</a>
        <a href="#">iPhone</a>
        <a href="#">Watch</a>
        <a href="#">AirPods</a>
        <div class="dropdown-account">
            <a href="#" id="account-btn"><img src="assets/account.png" alt="profilo"></a>
            <div id="account-dropdown" class="account-dropdown">
                <form method="get" action="{{ url('logout') }}">
                    <button type="submit">Logout</button>
                </form>
            </div>
        </div>
        <a href="#"><img src="assets/search.svg" alt="lente"></a>
        <a href="#"><img src="assets/shopping.svg" alt="shopping"></a>
        <span id ="welcome-message">Benvenuto, {{$username}}</span>
    </nav>
    <section>
        <h3 class='separated'>Raccolte</h3>
        <div id='collections'></div>
        <div id='add-collection-div'>
            Aggiungi <input id="add-collection"> <button id='add-collection-btn'>Ok</button>
        </div>
    </section>
</body>

</html>