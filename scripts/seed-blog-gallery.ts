import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { db } from '@/app/db';
import { posts } from '@/app/db/schema';

async function seed() {
    console.log('Seeding blog post with gallery...');

    const images = [
        'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg', // Scenic 1
        'https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg', // Scenic 2
        'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg'  // Scenic 3
    ];

    await db.insert(posts).values({
        title: 'A Visual Journey Through Sri Lanka',
        slug: 'visual-journey-sri-lanka',
        excerpt: 'Experience the breathtaking landscapes of the pearl of the Indian Ocean.',
        content: '<h1>The Highlands</h1><p>The tea plantations are lush and green.</p>',
        coverImage: 'https://images.pexels.com/photos/2403209/pexels-photo-2403209.jpeg',
        images: images,
        author: 'Traveler',
        category: 'Stories',
        published: true,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    console.log('Seeded successfully!');
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});



