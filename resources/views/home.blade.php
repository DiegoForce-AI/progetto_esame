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
    <div class="hero-evento-apple">
        <h2>Evento Apple</h2>
        <p>Seguilo oggi alle 19.</p>
    <img src="{{ url('assets/common/hero_apple_event_september__c2amjfe3dcqe_largetall.jpg') }}" alt="evento">
        <div class="hero-evento-apple-button">
            <div class="button">
                <button class='btn'>Aggiungi al calendario</button>
            </div>
        </div>
    </div>
    <div class="homepage">
        
    </div>
    <footer>
    &copy; 2024 Apple Inc. Tutti i diritti riservati.
</footer>
@endsection

@section('scripts')
    <script src ='{{ url("js/home.js") }}' defer></script>
@endsection