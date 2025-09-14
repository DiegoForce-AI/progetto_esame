<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="{{ url('css/home.css') }}">
    @yield('head')
</head>

<body>
    <nav>
        <a href="{{ url('home') }}"><img src="assets/logo.svg" alt="Apple Logo"></a>
        <a href="{{ url('prodotti') }}">Store</a>
        <a href="#">Mac</a>
        <a href="#">iPad</a>
        <a href="#">iPhone</a>
        <a href="#">Watch</a>
        <a href="#">AirPods</a>
        <div class="dropdown-account">
            <div class="account">
                <a href="#" id="account-btn"><img src="assets/account.png" alt="profilo"></a>
            </div>
            <div id="account-dropdown" class="account-dropdown">
                <form method="get" action="{{ url('logout') }}">
                    <button type="submit">Logout</button>
                </form>
            </div>
        </div>
        <a href="#"><img src="assets/search.svg" alt="lente"></a>
        <a href="#"><img src="assets/shopping.svg" alt="shopping"></a>
        <span id="welcome-message">Benvenuto, {{$username ?? ''}}</span>
    </nav>
    <main>
        @yield('content')
    </main>
    @yield('scripts')
</body>

</html>