@extends('layout')

@section('head')
    <link rel="stylesheet" href="{{ url('css/common.css') }}">
@endsection

@section('content')
   <div class='hero'>
    <a href="#"><img src="{{ url('assets/common/sfondo apple.png') }}" alt="sfondo" class="wallpaper"></a>
        <div class="hero-content">
            <div class="bubble-wrapper">
                <div class='hero-title'>
                    <p>Compra Mac o iPad per l'università</p>
                </div>
            </div>
            <div class='sticker'>
                <img class="img1" src="{{ url('assets/common/hero_sticker_mba__b0ht7774wpaq_largetall.png') }}" alt="MacBook Air">
                <img class='img2' src="{{ url('assets/common/hero_sticker_ipadair__bk6ffplndvte_largetall.png') }}" alt="ipad">
            </div>
            <div class='hero-overlay'>
                <div class="bubble-wrapper edu-container">
                    <p class="edu">con i prezzi Education</p>
                </div>
            </div>
            <div class='hero-background'>
                <img class="genmoij" src="{{ url('assets/common/genmoij.png') }}" alt="genmoij">
                <div class="bubble-wrapper">
                    <p>Scegli un paio di Airpods o un accesorio idoneo <span id='numero'></span> </p>
                </div>
            </div>
            <div class='hero-bottom'>
                <div class="button">
                    <button class='btn'>Acquista</button>
                </div>
            </div>
        </div>
    </div>
    <div class='hero-iphone'>
        <div class='hero-iphone-title'>
            <p>iPhone</p>
        </div>
        <div class='hero-iphone-description'>
            <p>Ti presentiamo la famiglia iPhone 16.</p>
        </div>
    <a href="#"><img src="{{ url('assets/common/hero_iphone_family__fuz5j2v5xx6y_largetall.jpg') }}" alt="iphone"></a>
        <div class='hero-iphone-button'>
            <div class="button">
                <button class='btn'>Scopri di più</button>
            </div>
        </div>
        <div class="hero-iphone-button2">
            <div class="button">
                <button class='btn'>Acquista iPhone</button>
            </div>
        </div>
        <div class='hero-iphone-subdescription'>
            <p>Progettati per Apple Intelligence</p>
        </div>
    </div>
    <div class="hero-macbook">
        <h2>Scopri i nuovi Macbook</h2>
    <img src="{{ url(path: 'assets/common/promo_macbook_air_avail__e8ksaudoisey_large.jpg') }}" alt="evento">
    <div class='hero-macbook-subdescription'>
            <p>Progettati per Apple Intelligence</p>
        </div>
        <div class="hero-macbook-button">
            <div class="button">
                <button class='btn'>Acquista</button>
            </div>
        </div>
    </div>
    <div class="homepage">
        
    </div>
    <footer>
        <p>&copy; {{ date('Y') }} <span>Apple</span>. Tutti i diritti riservati. <br>
        <br>Powered By: Diego Favitta, 1000044715</p>
   
        <a href="{{ url('spotify') }}">
            <span>Ascolta su </span>
            <img src="{{ url('/assets/common/spotify.jpg') }}" alt="Spotify">
        </a>
         @if(isset($track))
            <div class ="spotify-track">
                <a href="{{ $track['url'] }}">
                    <img src="{{ $track['image'] }}" class="spotify-track-img" alt="Copertina brano">
                    <span class="spotify-track-text"> {{ $track['title'] }} <br> {{ $track['artist'] }}</span>
                </a>
            </div>
        @endif
</footer>
@endsection

@section('scripts')
    <script src ='{{ url("js/home.js") }}' defer></script>
@endsection