<?php

namespace App\Http\Controllers;
    use Illuminate\Routing\Controller as BaseController;
    use Session;
    use App\Models\User;

 class  CollectionController extends BaseController
{

    public function home() {
        //Controllo se l'utente è loggato
    if(!Session::get('user_id')){
        return redirect('login');
    }
    //Leggiamo username
    $user = User::find(Session::get('user_id'));
            // Esempio: recupero traccia da Spotify API (mock, sostituisci con chiamata reale)
            $track = [
                'title' => 'Blinding Lights',
                'artist' => 'The Weeknd',
                'image' => 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
                'url' => 'spotify'
            ];
            return view('home', compact('track'));
    }

    

}
