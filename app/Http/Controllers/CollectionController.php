<?php

namespace App\Http\Controllers;
    use Illuminate\Routing\Controller as BaseController;
    use Session;
    use App\Models\User;

 class  CollectionController extends BaseController
{

    public function home() {
    if(!Session::get('user_id')){
        return redirect('login');
    }
    $user = User::find(Session::get('user_id'));
            $track = [
                'title' => 'Blinding Lights',
                'artist' => 'The Weeknd',
                'image' => 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
                'url' => 'spotify'
            ];
            return view('home', compact('track'));
    }

    

}
