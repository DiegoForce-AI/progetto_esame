@extends('layout')

@section('head')
    <link rel="stylesheet" href="{{ url('css/common.css') }}">
@endsection

@section('content')
    <section>
        <h3 class='separated'>Raccolte</h3>
        <div id='collections'></div>
        <div id='add-collection-div'>
            Aggiungi <input id="add-collection"> <button id='add-collection-btn'>Ok</button>
        </div>
    </section>
@endsection

@section('scripts')
    <script src ='{{ url("js/home.js") }}' defer></script>
@endsection