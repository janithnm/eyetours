import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function seed() {
    // Dynamic import to ensure env vars are loaded first
    const { db } = await import('@/app/db');
    const { packages } = await import('@/app/db/schema');

    console.log('Seeding new tour packages...');

    const newPackages = [
        {
            title: 'Ultimate Sri Lanka Beach Explorer',
            slug: 'ultimate-sri-lanka-beach-explorer',
            description: 'Relax on Sri Lanka’s pristine beaches with opportunities for water sports, whale watching, and coastal sightseeing.',
            price: '1500.00',
            durationDays: 10,
            category: 'Beach',
            type: 'package',
            isFeatured: true,
            published: true,
            thumbnailUrl: 'https://images.unsplash.com/photo-1544976739-1698282367c3?q=80&w=1000&auto=format&fit=crop', // Negombo/Beach placeholder
            images: [
                'https://images.unsplash.com/photo-1590680989932-d615951a8047?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=1000&auto=format&fit=crop'
            ],
            inclusions: [
                'Airport transfers',
                'Private vehicle & driver',
                'Beach resorts accommodation',
                'Breakfast & dinner',
                'Water sports & whale watching tours'
            ],
            exclusions: [
                'International flights',
                'Lunch & beverages',
                'Personal expenses',
                'Optional activities'
            ],
            itinerary: [
                {
                    day: 1,
                    title: 'Arrival & Negombo',
                    activities: [
                        {
                            title: 'Airport Pickup & Hotel Check-in',
                            description: 'Arrival at Bandaranaike International Airport, transfer to hotel, relax.'
                        }
                    ]
                },
                {
                    day: 2,
                    title: 'Kalpitiya',
                    activities: [
                        {
                            title: 'Dolphin Watching & Lagoon Tour',
                            description: 'Enjoy dolphin spotting in the Indian Ocean and lagoon exploration.'
                        }
                    ]
                },
                {
                    day: 3,
                    title: 'Bentota',
                    activities: [
                        {
                            title: 'Water Sports',
                            description: 'Engage in jet skiing, banana boat rides, and other water activities.'
                        }
                    ]
                },
                {
                    day: 4,
                    title: 'Galle Fort',
                    activities: [
                        {
                            title: 'Colonial Heritage Walk',
                            description: 'Explore the UNESCO World Heritage Galle Fort and lighthouse.'
                        }
                    ]
                },
                {
                    day: 5,
                    title: 'Mirissa',
                    activities: [
                        {
                            title: 'Whale Watching',
                            description: 'Early morning boat trip to spot blue whales and dolphins.'
                        }
                    ]
                },
                {
                    day: 6,
                    title: 'Tangalle',
                    activities: [
                        {
                            title: 'Beach Relaxation',
                            description: 'Leisure time on quiet beaches and sunset photography.'
                        }
                    ]
                },
                {
                    day: 7,
                    title: 'Unawatuna',
                    activities: [
                        {
                            title: 'Snorkeling & Beach Leisure',
                            description: 'Snorkel in crystal-clear waters and enjoy local seafood.'
                        }
                    ]
                },
                {
                    day: 8,
                    title: 'Arugam Bay',
                    activities: [
                        {
                            title: 'Surfing & Coastal Walk',
                            description: 'Surfing lessons or relax along the beautiful coastline.'
                        }
                    ]
                },
                {
                    day: 9,
                    title: 'Colombo',
                    activities: [
                        {
                            title: 'City Exploration & Shopping',
                            description: 'Explore Colombo’s landmarks and local markets.'
                        }
                    ]
                },
                {
                    day: 10,
                    title: 'Departure',
                    activities: [
                        {
                            title: 'Airport Transfer',
                            description: 'Transfer to airport for departure.'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Sri Lanka Wildlife & Adventure Escape',
            slug: 'sri-lanka-wildlife-adventure-escape',
            description: 'An exciting adventure tour combining wildlife safaris, trekking, and river rafting across Sri Lanka’s natural landscapes.',
            price: '1850.00',
            durationDays: 9,
            category: 'Wildlife',
            type: 'package',
            isFeatured: true,
            published: true,
            thumbnailUrl: 'https://images.unsplash.com/photo-1544837330-36a5369bb406?q=80&w=1000&auto=format&fit=crop', // Elephant/Wildlife placeholder
            images: [
                'https://images.unsplash.com/photo-1582488730925-56272559599c?q=80&w=1000&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1533282245229-8735df649f87?q=80&w=1000&auto=format&fit=crop'
            ],
            inclusions: [
                'Airport transfers',
                'Private vehicle & driver',
                'Hotel accommodation',
                'Breakfast & dinner',
                'Safari jeep',
                'Adventure guides'
            ],
            exclusions: [
                'International flights',
                'Lunch & beverages',
                'Personal expenses',
                'Travel insurance'
            ],
            itinerary: [
                {
                    day: 1,
                    title: 'Arrival & Negombo',
                    activities: [
                        {
                            title: 'Airport Pickup & Hotel Check-in',
                            description: 'Arrival at airport, transfer to hotel, relax.'
                        }
                    ]
                },
                {
                    day: 2,
                    title: 'Kitulgala',
                    activities: [
                        {
                            title: 'White Water Rafting',
                            description: 'Enjoy thrilling rafting experience on the Kelani River.'
                        }
                    ]
                },
                {
                    day: 3,
                    title: 'Ella Hills',
                    activities: [
                        {
                            title: 'Nine Arch Bridge & Little Adam’s Peak',
                            description: 'Scenic hike and photo opportunities in the hill country.'
                        }
                    ]
                },
                {
                    day: 4,
                    title: 'Yala National Park',
                    activities: [
                        {
                            title: 'Safari Jeep Tour',
                            description: 'Search for leopards, elephants, and exotic wildlife.'
                        }
                    ]
                },
                {
                    day: 5,
                    title: 'Udawalawe',
                    activities: [
                        {
                            title: 'Elephant Safari',
                            description: 'Jeep safari in Udawalawe National Park, famous for elephants.'
                        }
                    ]
                },
                {
                    day: 6,
                    title: 'Knuckles Mountain Range',
                    activities: [
                        {
                            title: 'Hiking & Nature Trek',
                            description: 'Explore trails, waterfalls, and scenic viewpoints.'
                        }
                    ]
                },
                {
                    day: 7,
                    title: 'Sinharaja Rainforest',
                    activities: [
                        {
                            title: 'Guided Jungle Trek',
                            description: 'Discover endemic flora and bird species in this UNESCO rainforest.'
                        }
                    ]
                },
                {
                    day: 8,
                    title: 'Camping Adventure',
                    activities: [
                        {
                            title: 'Overnight Camping',
                            description: 'Set up camp, enjoy bonfire, and night sky viewing.'
                        }
                    ]
                },
                {
                    day: 9,
                    title: 'Departure',
                    activities: [
                        {
                            title: 'Airport Transfer',
                            description: 'Transfer to airport for departure.'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Sri Lanka Gem Discovery Experience',
            slug: 'sri-lanka-gem-discovery-experience',
            description: 'Explore the world-famous gem industry of Sri Lanka with visits to mines, workshops, and jewelry centers.',
            price: '1200.00',
            durationDays: 5,
            category: 'Cultural',
            type: 'package',
            isFeatured: false,
            published: true,
            thumbnailUrl: 'https://images.unsplash.com/photo-1620218765452-957c7929d666?q=80&w=1000&auto=format&fit=crop', // Gem/Jewelry placeholder
            images: [
                'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=1000&auto=format&fit=crop'
            ],
            inclusions: [
                'Airport transfers',
                'Private vehicle & driver',
                'Hotel accommodation',
                'Breakfast',
                'Guided gem tours'
            ],
            exclusions: [
                'International flights',
                'Gem purchases',
                'Personal expenses',
                'Travel insurance'
            ],
            itinerary: [
                {
                    day: 1,
                    title: 'Arrival & Colombo',
                    activities: [
                        {
                            title: 'Airport Pickup & Hotel Check-in',
                            description: 'Arrival at airport, transfer to hotel, relax after journey.'
                        }
                    ]
                },
                {
                    day: 2,
                    title: 'Ratnapura',
                    activities: [
                        {
                            title: 'Gem Mine Visit',
                            description: 'Explore gem mines and watch mining demonstrations.'
                        }
                    ]
                },
                {
                    day: 3,
                    title: 'Gem Cutting Workshop',
                    activities: [
                        {
                            title: 'Gem Polishing & Cutting',
                            description: 'Learn gem cutting and polishing techniques from experts.'
                        }
                    ]
                },
                {
                    day: 4,
                    title: 'Jewelry Manufacturing Tour',
                    activities: [
                        {
                            title: 'Gem Jewelry Visit',
                            description: 'Visit jewelry factories and see gemstone crafting process.'
                        }
                    ]
                },
                {
                    day: 5,
                    title: 'Departure',
                    activities: [
                        {
                            title: 'Airport Transfer',
                            description: 'Transfer to airport for onward journey.'
                        }
                    ]
                }
            ]
        }
    ];

    for (const pkg of newPackages) {
        await db.insert(packages).values(pkg);
        console.log(`Added package: ${pkg.title}`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
}

seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
