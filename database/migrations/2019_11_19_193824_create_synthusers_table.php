<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSynthUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('synth_users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('param_id')->nullable();
            $table->unsignedBigInteger('queue_id');
            $table->timestamps();

            $table->foreign('queue_id')->references('id')->on('queues')->onDelete('cascade');
            $table->foreign('param_id')->references('id')->on('synthparams');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('synth_users');
    }
}
