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

    public function showJson($id)
    {
        $prodotto = Prodotto::with('immagini')->find($id);
        if (!$prodotto) {
            return response()->json(['error' => 'Prodotto non trovato'], 404);
        }
        return response()->json($prodotto);
    }

    public function search(Request $request)
    {
        $nome = $request->query('nome');

        if (!$nome) {
            return response()->json([
                'success' => false,
                'message' => 'Parametro "nome" mancante'
            ], 400);
        }

        $product = Prodotto::where('nome', 'LIKE', "%{$nome}%")->first();

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

