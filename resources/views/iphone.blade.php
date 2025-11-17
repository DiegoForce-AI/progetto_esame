@extends('layout')
@section('head')
    <title>iPhone - Store</title>
    <link rel="stylesheet" href="{{ url('css/prodotti.css') }}">
@endsection

@section('scripts')
    <script src="{{ url('js/prodotti.js') }}" defer></script>
    
@endsection

@section('content')
    <div class="prodotti-hero">
        <div class="prodotti-title">iPhone</div>
        <div class="prodotti-desc">Scopri tutti gli iPhone disponibili nello store.</div>
    </div>
    <div id="prodotti-container" class="prodotti-list">
        <!-- I prodotti iPhone verranno inseriti dinamicamente da prodotti.js -->
    </div>
@endsection

