<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('store_name')->default('thanhhoang');
            $table->string('store_owner')->default('thanhhoang');
            $table->string('logo')->default('logo.png');
            $table->text('address')->default('');
            $table->string('email', 100)->default('admin@localhost.com');
            $table->string('phone_number', 20)->default('');
            $table->string('currency', 10)->default('₫');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
