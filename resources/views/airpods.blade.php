@extends('layout')
@section('head')
    <title>Airpods - Store</title>
    <link rel="stylesheet" href="{{ url('css/prodotti.css') }}">
@endsection

@section('scripts')
    <script src="{{ url('js/prodotti.js') }}" defer></script>
    <script>
        window.PRODOTTI_FILTER = 'airpods';
    </script>
@endsection

@section('content')
    <div class="prodotti-hero">
        <div class="prodotti-title">Airpods</div>
        <div class="prodotti-desc">Scopri tutte le Airpods disponibili nello store.</div>
    </div>
    <div id="prodotti-container" class="prodotti-list">
        <!-- Le Airpods verranno inserite dinamicamente da prodotti.js -->
    </div>
@endsection

