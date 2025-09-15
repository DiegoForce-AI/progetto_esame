<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Prodotto;
use Illuminate\Routing\Controller as BaseController;

class ProdottoController extends BaseController
{

    public function index()
    {
        $prodotti = Prodotto::with('immagini')->get();
        return view('prodotti')->with('prodotti', $prodotti);
    }

    public function show($id)
    {
        $prodotto = Prodotto::with('immagini')->find($id);
        if (!$prodotto) {
            return redirect('prodotti');
        }
        return view('prodotto')->with('prodotto', $prodotto);

    }
    public function search(Request $request)
    {
        $name = $request->query('name'); // parametro ?name=...

        if (!$name) {
            return response()->json([
                'success' => false,
                'message' => 'Parametro "name" mancante'
            ], 400);
        }

    $product = Prodotto::where('nome', 'LIKE', "%{$name}%")->first();

        if ($product) {
            return response()->json([
                'success' => true,
                'product' => $product
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Prodotto non trovato'
        ], 404);
    }
}

