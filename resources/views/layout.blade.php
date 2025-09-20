<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="{{ url('css/home.css') }}">
    <link rel="stylesheet" href="{{ url('css/shopping.css') }}">
    @yield('head')
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body>
    <nav>
        <a href="{{ url('home') }}"><img src="{{ url('assets/logo.svg') }}" alt="Apple Logo"></a>
        <a href="{{ url('prodotti') }}">Store</a>
        <a href="#">Mac</a>
        <a href="#">iPad</a>
        <a href="#">iPhone</a>
        <a href="#">Watch</a>
        <a href="#">AirPods</a>

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

        <div style="display:inline-block; position:relative;">
            <a href="#" id="search-btn"><img src="{{ url('assets/search.svg') }}" alt="lente"></a>
            <div id="search-dropdown"
                style="display:none; position:absolute; right:0; background:#fff; border:1px solid #ccc; border-radius:6px; min-width:240px; z-index:1000; padding:10px;">


                <form id="search-form" action="{{ url('prodotti') }}" method="get" style="margin:0;">
                    <input type="text" name="nome" id="search-input" placeholder="Cerca prodotti..."
                        value="{{ request('nome') }}"
                        style="padding:4px 8px; border-radius:4px; border:1px solid #ccc; width:160px;">
                    <button id="searchBtn" type="submit"
                        style="padding:4px 10px; border-radius:4px; border:1px solid #ccc; background:#f5f5f5; cursor:pointer;">
                        Cerca
                    </button>
                </form>
            </div>
        </div>

        <a href="{{ url('/shopping') }}" id="shopping-btn"><img src="{{ url('assets/shopping.svg') }}" alt="shopping"></a>
        

        <span id="welcome-message">Benvenuto, {{$username ?? ''}}</span>
    </nav>

    <main>
        <div id="result" style="margin:20px; padding:10px;"></div>
        @yield('content')
    </main>
    <script>
        const API_SEARCH_URL = "{{ url('prodotti/search') }}";
        window.csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    </script>
    <script src="{{ url('js/home.js') }}" defer></script>
    <script src="{{ url('js/shopping.js') }}"></script>
    @yield('scripts')

</body>

</html>