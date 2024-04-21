<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todo>
 */
class TodoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $isCompleted = $this->faker->boolean;
        $shouldHaveDueDate = $this->faker->randomFloat(2, 0, 1) > 0.85;

        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'is_completed' => $isCompleted,
            'completed_at' => $isCompleted ? $this->faker->dateTimeThisMonth() : null,
            'due_date' => $shouldHaveDueDate ? $this->faker->dateTimeThisMonth() : null,
            'user_id' => function () {
                return User::factory()->create()->id;
            },
        ];
    }
}
