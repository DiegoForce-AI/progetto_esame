<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; 

class Carrello extends Model
{
    protected $table = 'carrelli';

    public function utente()
    {
        return $this->belongsTo(Utente::class, 'utente_id');
    }

    public function prodotti()
    {
        return $this->belongsToMany(Prodotto::class, 'carrello_prodotti', 'carrello_id', 'prodotto_id')
                    ->withPivot('quantita');
    }
}
