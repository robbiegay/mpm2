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

Route::post('/synthparams/pitch', function(Request $request) {
    SynthParam::where('param_name', 'pitch')->update(array('param_val' => $request->pitch));
    dd($request);
});
