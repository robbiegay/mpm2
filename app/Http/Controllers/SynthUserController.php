<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SynthUser;
use App\Queue;

class SynthUserController extends Controller
{
    public function store()
    {
        $q = Queue::create();
        SynthUser::create([
            'param_id' => $q->id <= 7 ? $q->id : null,
            'queue_id' => $q->id,
        ]);
    }
}
