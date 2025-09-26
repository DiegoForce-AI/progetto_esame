<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Prodotto;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

class ProdottoController extends BaseController
{
    public function getProdotti(Request $request)
    {
        $filter = $request->input('filter'); // Ottieni il filtro dalla richiesta
        $query = DB::table('prodotti'); // Tabella dei prodotti

        $validFilters = [
            'mac' => [1],
            'iphone' => [2],
            'ipad' => [3],
            'airpods' => [4],
            'mac-ipad-airpods' => [1, 3, 4],
        ];

        if ($filter !== null) {
            if (!array_key_exists($filter, $validFilters)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Filtro non valido.'
                ], 400);
            }
            $categorie = $validFilters[$filter];
            if (count($categorie) === 1) {
                $query->where('categoria_id', $categorie[0]);
            } else {
                $query->whereIn('categoria_id', $categorie);
            }
        }

        $prodotti = $query->get(); // Esegui la query e ottieni i risultati

        if ($prodotti->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Nessun prodotto trovato per il filtro richiesto.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'prodotti' => $prodotti
        ]);
    }

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
        if (isset($prodotto->categoria_id)) {
            if ($prodotto->categoria_id == 1)
                $backUrl = 'mac';
            elseif ($prodotto->categoria_id == 2)
                $backUrl = 'iphone';
            elseif ($prodotto->categoria_id == 3)
                $backUrl = 'ipad';
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

