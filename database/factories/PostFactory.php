<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image_path' => fake()->imageUrl(),
            'title' => fake()->sentence(),
            'user_id' => 1,
            'category_id' => fn() => Category::factory(1)->create()[0]->id,
            'slug' => fake()->slug(),
            'time_to_read' => fake()->time('i') . ' min',
            'content' => fake()->text(1000),
        ];
    }
}
