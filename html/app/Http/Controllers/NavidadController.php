<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use App;
use Session;
use App\User;
use Auth;
use Request;
use DB;




class NavidadController extends Controller{
    public function index(\Illuminate\Http\Request $request){
        /*if ($request->isMethod('post')){
            //return response()->json(['response' => 'This is post method']);
        }*/
        return view('index');
    }
    public function loginFacebook(\SammyK\LaravelFacebookSdk\LaravelFacebookSdk $fb){
        //$fb = App::make('SammyK\LaravelFacebookSdk\LaravelFacebookSdk');
        $login_link = $fb
        ->getRedirectLoginHelper()
        ->getLoginUrl('http://localhost:8080/fbcallback', ['email', 'user_events']);
        return view('fbLogin', compact('login_link'));
    }
    public function facebookjs(){
        return view('jslogin');
    }
    public function loginFacebookJs(\SammyK\LaravelFacebookSdk\LaravelFacebookSdk $fb){
        try {
            $token = $fb->getJavaScriptHelper()->getAccessToken();
        } catch (Facebook\Exceptions\FacebookSDKException $e) {
            // Failed to obtain access token
            dd($e->getMessage());
        }

        // $token will be null if no cookie was set or no OAuth data
        // was found in the cookie's signed request data
        if (! $token) {
            // Get the redirect helper
            $helper = $fb->getRedirectLoginHelper();

            if (! $helper->getError()) {
                abort(403, 'Unauthorized action.');
            }

            // User denied the request
            dd(
                $helper->getError(),
                $helper->getErrorCode(),
                $helper->getErrorReason(),
                $helper->getErrorDescription()
            );
        }

        if (! $token->isLongLived()) {
            // OAuth 2.0 client handler
            $oauth_client = $fb->getOAuth2Client();

            // Extend the access token.
            try {
                $token = $oauth_client->getLongLivedAccessToken($token);
            } catch (Facebook\Exceptions\FacebookSDKException $e) {
                dd($e->getMessage());
            }
        }
        $fb->setDefaultAccessToken($token);

        // Get basic info on the user from Facebook.
        try {
            $response = $fb->get('/me?fields=id,name,email');
        } catch (Facebook\Exceptions\FacebookSDKException $e) {
            dd($e->getMessage());
        }
        // Convert the response to a `Facebook/GraphNodes/GraphUser` collection
        $facebook_user = $response->getGraphUser();

        // Create the user if it does not exist or update the existing entry.
        // This will only work if you've added the SyncableGraphNodeTrait to your User model.
        $user = User::createOrUpdateGraphNode($facebook_user);

    }
    public function fbCallback(\SammyK\LaravelFacebookSdk\LaravelFacebookSdk $fb){
        // Obtain an access token.
        try {
            $token = $fb->getAccessTokenFromRedirect();
        } catch (Facebook\Exceptions\FacebookSDKException $e) {
            dd($e->getMessage());
        }
        // Access token will be null if the user denied the request
        // or if someone just hit this URL outside of the OAuth flow.
        if (! $token) {
            // Get the redirect helper
            $helper = $fb->getRedirectLoginHelper();

            if (! $helper->getError()) {
                abort(403, 'Unauthorized action.');
            }

            // User denied the request
            dd(
            $helper->getError(),
            $helper->getErrorCode(),
            $helper->getErrorReason(),
            $helper->getErrorDescription()
        );
    }

    if (! $token->isLongLived()) {
        // OAuth 2.0 client handler
        $oauth_client = $fb->getOAuth2Client();

        // Extend the access token.
        try {
            $token = $oauth_client->getLongLivedAccessToken($token);
        } catch (Facebook\Exceptions\FacebookSDKException $e) {
            dd($e->getMessage());
        }
    }
    $fb->setDefaultAccessToken($token);

    // Save for later
    Session::put('fb_user_access_token', (string) $token);

    // Get basic info on the user from Facebook.
    try {
        $response = $fb->get('/me?fields=id,name,email');
    } catch (Facebook\Exceptions\FacebookSDKException $e) {
        dd($e->getMessage());
    }
    // Convert the response to a `Facebook/GraphNodes/GraphUser` collection
    $facebook_user = $response->getGraphUser();

    // Create the user if it does not exist or update the existing entry.
    // This will only work if you've added the SyncableGraphNodeTrait to your User model.
    $user = User::createOrUpdateGraphNode($facebook_user);

    // Log the user into Laravel
    Auth::login($user);

    return redirect('/success')->with('message', 'Successfully logged in with Facebook');
    }
    public function success(){
        return view('fbsuccess');
    }
    public function postRank(\Illuminate\Http\Request $request){
        if ($request->isMethod('post')){
            $dataPostJson = $_POST;



            //$actualizar_ranking = User::where('facebook_id',$dataPostJson['idUsuario'])->firstOrCreate(['puntaje' => $dataPostJson['puntaje']]);
            $usuario = User::where('facebook_id',$dataPostJson['idUsuario'])->first();
            if($usuario -> puntaje == null){
                $usuario -> puntaje = $dataPostJson['puntaje'];
                $usuario -> save();
            }else if($usuario -> puntaje < $dataPostJson['puntaje']){
                $usuario -> puntaje = $dataPostJson['puntaje'];
                $usuario -> save();
            }

            $response = array(
                'status' => 'success',
                'msg' => 'Setting created successfully',
                'post' => $dataPostJson,
            );
            return \Response::json($response);  // <<<<<<<<< see this line
        }
            //return view('post_rank');

    }
    public function getRanking(){
        $usuarios = User::orderBy('puntaje','desc')->take(10)->get();
        return \Response::json($usuarios);
    }
}
