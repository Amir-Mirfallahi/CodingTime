<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Amir',
            'email' => 'mirfallahi2009@gmail.com',
            'password' => bcrypt('Amir1388'),
            'email_verified_at' => time(),
            'is_author' => true
        ]);

        Post::factory()->count(30)->has(Category::factory(1))->create();
    }
}
