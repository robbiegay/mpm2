<?php

use App\Http\Resources\SynthUserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Visuals and Sound
Route::get('/', function () {
    return view('display');
});

// User controllers
Route::get('/user', function () {
    return view('controller');
});
