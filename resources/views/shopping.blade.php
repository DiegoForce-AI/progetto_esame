@extends('layout')
<link rel="stylesheet" href="{{ url('css/shopping.css') }}">
@section('content')
    <h2>Shopping Bag</h2>
    <div id="shopping-bag-list">
        @if(count($cart) === 0)
            <p>La shopping bag è vuota.</p>
        @else
            <ul>
                @foreach($cart as $idx => $item)
                    <li>
                        <strong>{{ $item['nome'] }}</strong> - Quantità: {{ $item['quantita'] }}
                        <form action="{{ url('shopping/remove') }}" method="POST" style="display:inline;">
                            @csrf
                            @method('DELETE')
                            <input type="hidden" name="idx" value="{{ $idx }}">
                            <button type="submit">Rimuovi</button>
                        </form>
                        <form action="{{ url('shopping/update') }}" method="POST" style="display:inline;">
                            @csrf
                            @method('PATCH')
                            <input type="hidden" name="idx" value="{{ $idx }}">
                            <input type="number" name="quantita" value="{{ $item['quantita'] }}" min="1" style="width:50px;">
                            <button type="submit">Aggiorna</button>
                        </form>
                    </li>
                @endforeach
            </ul>
        @endif
    </div>
    <form action="{{ url('shopping/add') }}" method="POST" style="margin-top:20px;">
        @csrf
        <input type="text" name="nome" placeholder="Nome prodotto" required>
        <input type="number" name="quantita" value="1" min="1" style="width:50px;">
        <button type="submit">Aggiungi prodotto</button>
    </form>
    <div id="shopping-items">

    </div>
    @section('scripts')
    <script src="{{ url('js/shopping.js') }}"defer></script>
@endsection
@endsection
