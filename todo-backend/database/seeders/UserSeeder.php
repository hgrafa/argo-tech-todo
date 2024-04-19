<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 5 users with 50 todos each
        User::factory()->count(5)->hasTodos(50)->create([
            'password' => bcrypt('12345678'),
        ]);

        // Create 5 users with 15 todos each
        User::factory()->count(5)->hasTodos(15)->create([
            'password' => bcrypt('12345678'),
        ]);

        // Create 5 users with 3 todos each
        User::factory()->count(5)->hasTodos(3)->create([
            'password' => bcrypt('12345678'),
        ]);
    }
}
