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
        Schema::table('todos', function (Blueprint $table) {
            $table->dropColumn('completed');
            $table->enum('status', ['Completed', 'Pending', 'Cancelled'])
                ->default('Pending')
                ->after('Completed');
        });
    }

    public function down(): void
    {
        Schema::table('todos', function (Blueprint $table) {
            $table->boolean('completed')->default(false);
            $table->dropColumn('completion_status');
        });
    }
};
