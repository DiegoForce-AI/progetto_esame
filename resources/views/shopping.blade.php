@extends('layout')
<link rel="stylesheet" href="{{ url('css/shopping.css') }}">
@section('content')
    <h2>Shopping Bag</h2>
    <table class="shopping-cart-table">
        <thead>
            <tr>
                <th>Immagine</th>
                <th>Prodotto</th>
                <th>Prezzo</th>
                <th>Quantità</th>
                <th>Subtotale</th>
            </tr>
        </thead>
        <tbody>
        @foreach($cart as $prodotto)
            <tr>
                <td>
                    @if($prodotto['foto'])
                        <img src="{{ url( $prodotto['foto']) }}"
                             alt="{{ $prodotto['nome'] }}"
                             class="cart-product-img">
                    @else
                        <span>Nessuna foto</span>
                    @endif
                </td>
                <td>{{ $prodotto['nome'] }}</td>
                <td>{{ number_format($prodotto['prezzo'], 2) }} €</td>
                <td>
                    <form action="{{ url('shopping/update') }}" method="POST" style="display:inline;">
                        @csrf
                        @method('PATCH')
                        <input type="hidden" name="prodotto_id" value="{{ $prodotto['id'] }}">
                        <input type="number" name="quantita" value="{{ $prodotto['quantita'] }}" min="1" max="99" style="width:60px; text-align:center;" onchange="this.form.submit()">
                    </form>
                </td>
                <td>{{ number_format($prodotto['subtotale'], 2) }} €</td>
            </tr>
        @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" class="cart-total-label"><strong>Totale:</strong></td>
                <td><strong>{{ number_format($totale, 2) }} €</strong></td>
            </tr>
        </tfoot>
    </table>
    <br>
    <a href="{{ url('checkout') }}" class="btn btn-primary cart-checkout-btn">Checkout</a>
@endsection
