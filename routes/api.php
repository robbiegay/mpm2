<?php

use Illuminate\Http\Request;

use App\SynthParam;

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
    SynthParam::where('param_name', 'trigger')->update(array('param_val' => 0));
    SynthParam::where('param_name', 'pitch')->update(array('param_val' => 400));
    SynthParam::where('param_name', 'pingPongDelayFbk')->update(array('param_val' => 0));
    SynthParam::where('param_name', 'chebWet')->update(array('param_val' => 0));
    SynthParam::where('param_name', 'reverbDryWet')->update(array('param_val' => 0));

});

Route::post('/synthparams/pitch', function(Request $request) {
    SynthParam::where('param_name', 'pitch')->update(array('param_val' => $request->pitch));
});

Route::post('/synthparams/pingPongDelayFbk', function(Request $request) {
    SynthParam::where('param_name', 'pingPongDelayFbk')->update(array('param_val' => $request->pingPongDelayFbk));
});

Route::post('/synthparams/chebWet', function(Request $request) {
    SynthParam::where('param_name', 'chebWet')->update(array('param_val' => $request->chebWet));
});

Route::post('/synthparams/reverbDryWet', function(Request $request) {
    SynthParam::where('param_name', 'reverbDryWet')->update(array('param_val' => $request->reverbDryWet));
});

Route::post('/synthparams/trigger', function(Request $request) {
    SynthParam::where('param_name', 'trigger')->update(array('param_val' => $request->trigger));
});
