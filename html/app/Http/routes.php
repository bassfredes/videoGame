<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'NavidadController@index');
Route::get('/fblogin', 'NavidadController@loginFacebook');
Route::get('/fbcallback', 'NavidadController@fbCallback');
Route::get('/success', 'NavidadController@success');
Route::get('/js_fblogin', 'NavidadController@loginFacebookJs');
