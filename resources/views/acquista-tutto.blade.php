@extends('layout')
@section('head')
    <title>Acquista - Tutti i prodotti</title>
    <link rel="stylesheet" href="{{ url('css/prodotti.css') }}">
@endsection

@section('scripts')
    <script src="{{ url('js/prodotti.js') }}" defer></script>
    <script>
        window.PRODOTTI_FILTER = 'mac-ipad-airpods';
    </script>
@endsection

@section('content')
    <div class="prodotti-hero">
        <div class="prodotti-title">Acquista Mac, iPad e Airpods</div>
        <div class="prodotti-desc">Scopri tutti i prodotti Mac, iPad e Airpods disponibili nello store.</div>
    </div>
    <div id="prodotti-container" class="prodotti-list">
        <!-- I prodotti verranno inseriti dinamicamente da prodotti.js -->
    </div>
@endsection

