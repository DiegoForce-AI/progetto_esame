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
    return view('home')->with('username', $user->username);
    }



}
