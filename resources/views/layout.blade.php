<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="{{ url('css/home.css') }}">
    <link rel="stylesheet" href="{{ url('css/shopping.css') }}">
    @yield('head')
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>



<body class = @yield('body-class', '')>
    
    <nav>
    <a href="{{ url('home') }}"><img src="{{ url('assets/logo.svg') }}" alt="Apple Logo"></a>
    <a href="{{ url('prodotti') }}">Store</a>
    <a href="{{ url('mac') }}">Mac</a>
    <a href="{{ url('ipad') }}">iPad</a>
    <a href="{{ url('iphone') }}">iPhone</a>
    <a href="{{ url('airpods') }}">Airpods</a>
    <a href="{{ url('spotify') }}">Spotify</a>
    <a href="{{ url('fakestore') }}">FakeStore</a>

        <div class="dropdown-account">
            <div class="account">
                <a href="#" id="account-btn"><img src="{{ url('assets/account.png') }}" alt="profilo"></a>
            </div>
            <div id="account-dropdown" class="account-dropdown">
                <form method="get" action="{{ url('logout') }}">
                    <button type="submit">Logout</button>
                </form>
            </div>
        </div>

        <div class="search-dropdown-wrapper">
            <a href="#" id="search-btn"><img src="{{ url('assets/search.svg') }}" alt="lente"></a>
            <div id="search-dropdown" class="search-dropdown">
                <form id="search-form" action="{{ url('prodotti') }}" method="get">
                    <input type="text" name="nome" id="search-input" placeholder="Cerca prodotti..."
                           value="{{ request('nome') }}">
                    <button id="searchBtn" type="submit">Cerca</button>
                </form>
            </div>
        </div>

        <a href="{{ url('/shopping') }}" id="shopping-btn"><img src="{{ url('assets/shopping.svg') }}" alt="shopping"></a>

        <span id="welcome-message">Benvenuto, {{$username ?? ''}}</span>
    </nav>

    <main>
        <div id="result"></div>
        @yield('content')
    </main>

    <footer class="site-footer">
        <div class="footer-flex">
            <div class="footer-block-fakestore">
                <span class="fakestore-label">Continua ad acquistare su FakeStore</span>
                <a href="{{ url('fakestore') }}">
                    <img src="{{ url('assets/common/fakestore.png') }}" alt="FakeStore" class="fakestore-img">
                </a>
            </div>
            <div class="footer-block-right">
                <span class="spotify-label">Ascolta su <img src="{{ url('assets/common/spotify.jpg') }}" alt="Spotify" class="spotify-track-text"></span>
                <div class="spotify-track-info">
                    <a href="{{ url('spotify') }}" class="spotify-track-link">
                        <img src="https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36" alt="Copertina brano" class="spotify-track-img">
                        <span class="spotify-track-text">Blinding Lights<br>The Weeknd</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-center">
            <p>&copy; {{ date('Y') }} <span>Apple</span>. Tutti i diritti riservati.<br>
            <br>Powered By: Diego Favitta, 1000044715</p>
        </div>
    </footer>

    <script>
        const API_SEARCH_URL = "{{ url('prodotti/search') }}";
        window.csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    </script>

    @yield('scripts')
    <script src="{{ url('js/home.js') }}" defer></script>
    <script src="{{ url('js/shopping.js') }}" defer></script>
</body>
</html>
