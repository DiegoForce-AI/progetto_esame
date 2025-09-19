@extends('layout')
<link rel="stylesheet" href="{{ url('css/prodotti.css') }}">
@section('head')
    <title>Lista Prodotti</title>
@endsection

@section('content')
    <h1>Prodotti disponibili</h1>
    <div id="prodotti-container" class="prodotti-list">
        <!-- I prodotti verranno inseriti dinamicamente da prodotti.js -->
    </div>
    
@endsection

@section('scripts')
    <script src="{{ url('js/prodotti.js') }}" defer></script>
@endsection


