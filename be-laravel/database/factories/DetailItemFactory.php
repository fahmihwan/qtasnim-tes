<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetailItem>
 */
class DetailItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'item_id' => fake()->numberBetween(1, 2),
            'category_id' => fake()->numberBetween(1, 5),
            'stock' => fake()->randomNumber(2, true),
            'sales_qty' => fake()->randomNumber(2, true),
            'transaction_date' => fake()->date(),
        ];
    }
}
