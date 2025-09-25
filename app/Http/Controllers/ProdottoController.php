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
        $track = [
            'title' => 'Blinding Lights',
            'artist' => 'The Weeknd',
            'image' => 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
            'url' => 'spotify'
        ];
        return view('prodotti')->with(['prodotti' => $prodotti, 'track' => $track]);
    }

    public function show($id)
    {
        $prodotto = Prodotto::with('immagini')->find($id);
        if (!$prodotto) {
            return redirect('prodotti');
        }
        $track = [
            'title' => 'Blinding Lights',
            'artist' => 'The Weeknd',
            'image' => 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
            'url' => 'spotify'
        ];
        $backUrl = 'prodotti';
        if(isset($prodotto->categoria_id)) {
            if($prodotto->categoria_id == 1) $backUrl = 'mac';
            elseif($prodotto->categoria_id == 2) $backUrl = 'iphone';
            elseif($prodotto->categoria_id == 3) $backUrl = 'ipad';
        }
        return view('prodotto')->with(['prodotto' => $prodotto, 'track' => $track, 'backUrl' => $backUrl]);
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

