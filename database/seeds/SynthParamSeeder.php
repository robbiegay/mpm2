<?php

use Illuminate\Database\Seeder;
use App\SynthParam;
// use DB;

class SynthParamSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $params = ["pitch", "trigger", "pingPongFbk", "chebWet", "reverbWet", "stroke", "sqSize"];
        
        foreach($params as $i => $val) {
            SynthParam::create([
                'param_name' => $val,
                'param_val' => $i === 0 ? 400.00 : ($i === 6 ? 3.00 : 0.00),
            ]);
        }
    }

    // factory(App\User::class, 20)->create()->each(function ($user) {
    //     $user->post()->save(factory(App\Post::class)->make());
    // });
}
