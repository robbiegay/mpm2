<?php

use Illuminate\Http\Request;

use App\SynthParam;
use App\SynthUser;
use App\Queue;
use SebastianBergmann\Environment\Console;
use App\Http\Resources\SynthUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/synthparams', function () {
    $params = SynthParam::all();
    $paramArray = array();
    foreach ($params as $item) {
        $paramArray[$item->param_name] = $item->param_val;
    }
    return $paramArray;
});

// Resets Synth params on SynthVisuals page load
Route::post('/synthparams/reset', function () {
    SynthParam::where('param_name', 'trigger')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'pitch')->update(array('param_val' => 400.00));
    SynthParam::where('param_name', 'pingPongFbk')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'chebWet')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'reverbWet')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'stroke')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'sqSize')->update(array('param_val' => 3.00));
});

// Synth params
Route::post('/synthparams/pitch', function (Request $request) {
    SynthParam::where('param_name', 'pitch')->update(array('param_val' => $request->pitch));
});

Route::post('/synthparams/pingPongFbk', function (Request $request) {
    SynthParam::where('param_name', 'pingPongFbk')->update(array('param_val' => $request->pingPongFbk));
});

Route::post('/synthparams/chebWet', function (Request $request) {
    SynthParam::where('param_name', 'chebWet')->update(array('param_val' => $request->chebWet));
});

Route::post('/synthparams/reverbWet', function (Request $request) {
    SynthParam::where('param_name', 'reverbWet')->update(array('param_val' => $request->reverbWet));
});

Route::post('/synthparams/trigger', function () {
    $data = SynthParam::where('param_name', 'trigger')->get('param_val');
    SynthParam::where('param_name', 'trigger')->update(array('param_val' => $data[0]['param_val'] === 0.00 ? 1.00 : 0.00));
});

// Visualizer params
Route::post('/synthparams/stroke', function () {
    $data = SynthParam::where('param_name', 'stroke')->get('param_val');
    SynthParam::where('param_name', 'stroke')->update(array('param_val' => $data[0]['param_val'] === 0.00 ? 1.00 : 0.00));
});

Route::post('/synthparams/sqSize', function (Request $request) {
    SynthParam::where('param_name', 'sqSize')->update(array('param_val' => $request->sqSize));
});

// Create new anon user on page load
Route::post('/newuser', 'SynthUserController@store');

// Clears the synth users and queue on SynthVisuals page load
Route::post('/synthparams/clear', function () {
    // Make my app insecure, remove if hosting on local device
    Eloquent::unguard();

    SynthUser::truncate();

    Queue::where('id', '>', 0)->delete();
    DB::statement("ALTER TABLE queues AUTO_INCREMENT = 1;");
});

Route::get('/userid', function() {
    return SynthUser::latest()->first();
});
