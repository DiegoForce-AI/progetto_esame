@extends('layout')
<link rel="stylesheet" href="{{ url('css/shopping.css') }}">
@section('content')
    <h2>Shopping Bag</h2>
    <div id="shopping-items"></div>
    <br>
    <a href="{{ url('checkout') }}" class="btn btn-primary" style="margin-top:20px;">Checkout</a>
@endsection