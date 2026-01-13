<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $tags = [
            ['Laravel', 'PHP', 'MySQL'],
            ['React', 'TypeScript', 'Vite'],
            ['Next.js', 'TailwindCSS', 'Prisma'],
            ['Vue.js', 'Nuxt', 'Supabase'],
            ['Flutter', 'Dart', 'Firebase'],
        ];

        return [
            'title' => [
                'fr' => fake()->sentence(3),
                'en' => fake()->sentence(3),
            ],
            'description' => [
                'fr' => fake()->paragraph(),
                'en' => fake()->paragraph(),
            ],
            'tags' => fake()->randomElement($tags),
            'github' => 'https://github.com/Maximus203/' . fake()->slug(),
            'demo_url' => fake()->url(),
            'image' => 'https://placehold.co/600x400?text=' . urlencode(fake()->word()),
            'category' => fake()->randomElement(['web', 'mobile', 'desktop', 'api']),
            'featured' => fake()->boolean(30), // 30% chance of being featured
        ];
    }
}
