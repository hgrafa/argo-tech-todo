<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->count(1)->hasTodos(3)->create([
            'name' => 'Alice Green',
            'email' => 'a@email.com',
            'password' => bcrypt('12345678'),
        ]);

        User::factory()->count(1)->hasTodos(15)->create([
            'name' => 'Bob Brown',
            'email' => 'b@email.com',
            'password' => bcrypt('12345678'),
        ]);

        User::factory()->count(1)->hasTodos(90)->create([
            'name' => 'Charlie White',
            'email' => 'c@email.com',
            'password' => bcrypt('12345678'),
        ]);
    }
}
