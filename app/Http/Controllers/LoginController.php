<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as BaseController;
use Session;
use App\Models\User;

class LoginController extends BaseController
{

    public function login_form()
    {
        if (Session::get('user_id')) {
            return redirect('home');
        }
        $error = Session::get('error');
        Session::forget('error');
        return view('login')->with('error', $error);
    }

    public function do_login()
    {
        if (Session::get('user_id')) {
            if (request()->ajax()) {
                return response()->json(['success' => true, 'redirect' => url('home')]);
            }
            return redirect('home');
        }

        if (strlen(request('username')) == 0 || strlen(request('password')) == 0) {
            $error = 'Inserisci username e password';
            if (request()->ajax()) {
                return response()->json(['success' => false, 'error' => $error]);
            }
            Session::put('error', 'dati_mancanti');
            return redirect('login')->withInput();
        }

        $user = User::where('username', request('username'))->first();
        if (!$user || !password_verify(request('password'), $user->password)) {
            $error = 'Credenziali non valide';
            if (request()->ajax()) {
                return response()->json(['success' => false, 'error' => $error]);
            }
            Session::put('error', 'credenziali_non_valide');
            return redirect('login')->withInput();
        }

        Session::put('user_id', $user->id);
        Session::put('username', $user->username);
        if (request()->ajax()) {
            return response()->json(['success' => true, 'redirect' => url('home')]);
        }
        return redirect('home');
    }

    public function register_form()
    {
        if (Session::get('user_id')) {
            return redirect('home');
        }
        $error = Session::get('error');
        Session::forget('error');
        return view('register')->with('error', $error);
    }

    public function do_register()
    {
        if (Session::get('user_id')) {
            return redirect('home');
        }
        //Validazione dati
        if (strlen(request('username')) == 0 || strlen(request('password')) == 0) {
            Session::put('error', 'dati_mancanti');
            return redirect('register')->withInput();
        } else if (request('password') != request('conferma')) {
            Session::put('error', 'le_password_non_corrispondono');
            return redirect('register')->withInput();
        } else if (User::where('username', request('username'))->first()) {
            Session::put('error', 'nome_utente_gia_esistente');
            return redirect('register')->withInput();
        } else if (
            strlen(request('password')) < 8 ||
            !preg_match('/[a-z]/', request('password')) ||
            !preg_match('/[A-Z]/', request('password')) ||
            !preg_match('/[0-9]/', request('password')) ||
            !preg_match('/[\W]/', request('password'))
        ) {
            Session::put('error', 'password_insicura');
            return redirect('register')->withInput();
        }

        //Creazione nuovo utente
        $user = new User();
        $user->username = request('username');
        $user->password = password_hash(request('password'), PASSWORD_BCRYPT);
        $user->save();

        //Login manuale
        Session::put('user_id', $user->id);
        Session::put('username', $user->username);
        return redirect('home');
    }
    public function logout()
    {
        Session::flush();
        return redirect('login');
    }
}
