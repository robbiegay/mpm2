<?php

use Illuminate\Http\Request;

use App\SynthParam;
use SebastianBergmann\Environment\Console;

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

Route::get('/synthparams', function() {
    $params = SynthParam::all();
    $paramArray = array();
    foreach ($params as $item) {
        $paramArray[$item->param_name] = $item->param_val;
    }
    return $paramArray;
});

Route::post('/synthparams/reset', function() {
    SynthParam::where('param_name', 'trigger')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'pitch')->update(array('param_val' => 400.00));
    SynthParam::where('param_name', 'pingPongFbk')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'chebWet')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'reverbWet')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'stroke')->update(array('param_val' => 0.00));
    SynthParam::where('param_name', 'sqSize')->update(array('param_val' => 3.00));
});

Route::post('/synthparams/pitch', function(Request $request) {
    SynthParam::where('param_name', 'pitch')->update(array('param_val' => $request->pitch));
});

Route::post('/synthparams/pingPongFbk', function(Request $request) {
    SynthParam::where('param_name', 'pingPongFbk')->update(array('param_val' => $request->pingPongFbk));
});

Route::post('/synthparams/chebWet', function(Request $request) {
    SynthParam::where('param_name', 'chebWet')->update(array('param_val' => $request->chebWet));
});

Route::post('/synthparams/reverbWet', function(Request $request) {
    SynthParam::where('param_name', 'reverbWet')->update(array('param_val' => $request->reverbWet));
});

Route::post('/synthparams/trigger', function() {
    $data = SynthParam::where('param_name', 'trigger')->get('param_val');
    SynthParam::where('param_name', 'trigger')->update(array('param_val' => $data[0]['param_val'] === 0.00 ? 1.00 : 0.00));
});

Route::post('/synthparams/stroke', function() {
    $data = SynthParam::where('param_name', 'stroke')->get('param_val');
    SynthParam::where('param_name', 'stroke')->update(array('param_val' => $data[0]['param_val'] === 0.00 ? 1.00 : 0.00));
});

Route::post('/synthparams/sqSize', function(Request $request) {
    SynthParam::where('param_name', 'sqSize')->update(array('param_val' => $request->sqSize));
});
