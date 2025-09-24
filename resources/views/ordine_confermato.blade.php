@extends('layout')
<link rel="stylesheet" href="{{ url('css/checkout.css') }}">
@section('content')
    <div class="ordine-successo-msg">
    <h2 class="ordine-successo-titolo">Ordine effettuato con successo &#10004;</h2>
    <p class="ordine-successo-testo">Grazie per il tuo acquisto! Riceverai una email di conferma a breve.</p>
    </div>
    <script>
        setTimeout(function(){ window.location.href = "{{ url('home') }}"; }, 2000);
    </script>
@endsection
