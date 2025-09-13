<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Prodotto;
use Illuminate\Routing\Controller as BaseController;

class ProdottoController extends BaseController
{

public function index() {
    $prodotti = Prodotto::with('immagini')->get();
    return view('prodotti')->with('prodotti', $prodotti);
}
}
