@extends('layout')
@section('head')
    <title>iPad - Store</title>
    <link rel="stylesheet" href="{{ url('css/prodotti.css') }}">
@endsection

@section('scripts')
    <script src="{{ url('js/prodotti.js') }}" defer></script>
    <script>
        window.PRODOTTI_FILTER = 'ipad';
    </script>
@endsection

@section('content')
    <div class="prodotti-hero">
        <div class="prodotti-title">iPad</div>
        <div class="prodotti-desc">Scopri tutti gli iPad disponibili nello store.</div>
    </div>
    <div id="prodotti-container" class="prodotti-list">
        <!-- I prodotti iPad verranno inseriti dinamicamente da prodotti.js -->
    </div>
@endsection
