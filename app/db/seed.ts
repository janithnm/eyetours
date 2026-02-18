import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
const samplePackages = [
    {
        title: "Ella Odyssey & Hill Country Magic",
        slug: "ella-odyssey-hill-country",
        description: "Experience the breathtaking views of Ella, ride the famous blue train, and hike through lush tea plantations. This tour covers the best of Sri Lanka's hill country, offering a perfect blend of adventure and relaxation.",
        price: "850.00",
        durationDays: 5,
        category: "Adventure",
        isFeatured: true,
        thumbnailUrl: "https://images.pexels.com/photos/35456333/pexels-photo-35456333.jpeg",
        images: [
            "https://images.pexels.com/photos/35456333/pexels-photo-35456333.jpeg",
            "https://images.pexels.com/photos/34218645/pexels-photo-34218645.jpeg", // Nine Arches
            "https://images.pexels.com/photos/32326686/pexels-photo-32326686.jpeg", // Forest Road
            "https://images.pexels.com/photos/30429205/pexels-photo-30429205.jpeg"  // Misty Hills
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrival & Kandy",
                image: "https://images.pexels.com/photos/32398215/pexels-photo-32398215.jpeg",
                activities: [
                    { title: "Airport Pickup", description: "Our friendly guide will greet you at Bandaranaike International Airport and assist with your luggage." },
                    { title: "Transfer to Kandy", description: "Enjoy a scenic drive to Kandy, the cultural capital of Sri Lanka, passing through pineapple plantations and cashew groves." },
                    { title: "Temple of the Tooth Relic", description: "Visit the sacred Temple of the Tooth Relic, a UNESCO World Heritage site that houses the relic of the tooth of the Buddha." }
                ]
            },
            {
                day: 2,
                title: "Kandy to Ella",
                image: "https://images.pexels.com/photos/31572677/pexels-photo-31572677.jpeg", // Scenic train view context
                activities: [
                    { title: "Scenic Train Ride", description: "Board the famous blue train for one of the most scenic train journeys in the world, winding through misty tea plantations and mountains." },
                    { title: "Tea Plantation Visit", description: "Stop at a lush tea plantation to learn about the tea-making process and taste pure Ceylon tea." },
                    { title: "Check-in at Ella", description: "Arrive in the charming village of Ella and check into your boutique hotel with stunning views." }
                ]
            },
            {
                day: 3,
                title: "Exploring Ella",
                image: "https://images.pexels.com/photos/34218645/pexels-photo-34218645.jpeg", // Nine arches
                activities: [
                    { title: "Little Adam's Peak", description: "Hike up Little Adam's Peak for panoramic views of the Ella Gap and surrounding valleys. It's a relatively easy climb with rewarding scenery." },
                    { title: "Nine Arch Bridge", description: "Visit the iconic Nine Arch Bridge, an architectural marvel set amidst dense jungle and tea fields. Watch the train pass over the bridge." },
                    { title: "Ravana Falls", description: "Make a quick stop to admire the cascading Ravana Falls, one of the widest waterfalls in Sri Lanka." }
                ]
            },
            {
                day: 4,
                title: "Nuwara Eliya",
                image: "https://images.pexels.com/photos/30429205/pexels-photo-30429205.jpeg", // Misty Hills
                activities: [
                    { title: "Transfer to Nuwara Eliya", description: "Drive to Nuwara Eliya, known as 'Little England' for its colonial architecture and cool climate." },
                    { title: "Gregory Lake", description: "Relax by the serene Gregory Lake, where you can take a boat ride or enjoy a lakeside walk." },
                    { title: "Victoria Park", description: "Stroll through the beautifully landscaped Victoria Park, originally the research field of Hakgala Botanical Garden." }
                ]
            },
            {
                day: 5,
                title: "Departure",
                image: "https://images.pexels.com/photos/32326686/pexels-photo-32326686.jpeg", // Forest road/Departure
                activities: [
                    { title: "Colombo City Tour", description: "On your way back, enjoy a brief tour of Colombo, visiting key landmarks like Gangaramaya Temple and Independence Square." },
                    { title: "Airport Drop-off", description: "We will drop you off at the airport in time for your departure flight. Safe travels!" }
                ]
            }
        ],
        inclusions: ["Accommodation", "Breakfast", "Transport", "Guide", "Entrance Fees"],
        exclusions: ["Flights", "Lunch & Dinner", "Personal Expenses", "Tips"],
        published: true
    },
    {
        title: "Southern Coast Beach Bliss",
        slug: "southern-coast-beach-bliss",
        description: "Relax on the pristine beaches of Mirissa and Unawatuna. Go whale watching, surf the waves, and explore the historic Galle Fort. A perfect tropical getaway.",
        price: "600.00",
        durationDays: 4,
        category: "Beaches",
        isFeatured: true,
        thumbnailUrl: "https://images.pexels.com/photos/33171756/pexels-photo-33171756.jpeg",
        images: [
            "https://images.pexels.com/photos/33171756/pexels-photo-33171756.jpeg",
            "https://images.pexels.com/photos/32398184/pexels-photo-32398184.jpeg", // Aerial Coastline
            "https://images.pexels.com/photos/20712001/pexels-photo-20712001.jpeg", // Galle Seas
            "https://images.pexels.com/photos/29813527/pexels-photo-29813527.jpeg"  // Coastal Scene
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrival & Bentota",
                image: "https://images.pexels.com/photos/32398184/pexels-photo-32398184.jpeg",
                activities: [
                    { title: "Airport Pickup", description: "Welcome to Sri Lanka! Your private chauffeur guide will pick you up from the airport." },
                    { title: "River Safari", description: "Enjoy a boat safari on the Madu River, exploring mangrove tunnels and visiting Cinnamon Island." },
                    { title: "Turtle Hatchery", description: "Visit a turtle conservation project to see sea turtles and learn about conservation efforts." }
                ]
            },
            {
                day: 2,
                title: "Galle & Unawatuna",
                image: "https://images.pexels.com/photos/20712001/pexels-photo-20712001.jpeg",
                activities: [
                    { title: "Galle Fort", description: "Explore the UNESCO World Heritage site of Galle Fort, walking along the ramparts and cobblestone streets lined with cafes and boutiques." },
                    { title: "Jungle Beach", description: "relax at the secluded Jungle Beach, a hidden gem near Unawatuna perfect for swimming and snorkeling." },
                    { title: "Sunset at Unawatuna", description: "End your day watching a spectacular sunset at Unawatuna Beach." }
                ]
            },
            {
                day: 3,
                title: "Mirissa",
                image: "https://images.pexels.com/photos/29813527/pexels-photo-29813527.jpeg",
                activities: [
                    { title: "Whale Watching", description: "Set off early morning for an exciting whale watching expedition to spot Blue Whales and Dolphins in their natural habitat." },
                    { title: "Coconut Tree Hill", description: "Visit the famous Coconut Tree Hill for that perfect Instagram shot with the ocean backdrop." },
                    { title: "Relax at Beach", description: "Spend the afternoon leisure at Mirissa Beach, enjoying the sun and sand." }
                ]
            },
            {
                day: 4,
                title: "Departure",
                image: "https://images.pexels.com/photos/32398173/pexels-photo-32398173.jpeg",
                activities: [
                    { title: "Transfer to Airport", description: "Transfer to the airport for your flight back home, carrying memories of sun, sand, and sea." }
                ]
            }
        ],
        inclusions: ["Accommodation", "Breakfast", "Transport", "Guide"],
        exclusions: ["Flights", "Meals", "Personal Expenses"],
        published: true
    },
    {
        title: "Cultural Triangle Heritage Tour",
        slug: "cultural-triangle-heritage",
        description: "Step back in time and explore the ancient cities of Sigiriya, Polonnaruwa, and Dambulla. Witness the majesty of Sri Lankan history and culture.",
        price: "950.00",
        durationDays: 6,
        category: "Heritage",
        isFeatured: true,
        thumbnailUrl: "https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg",
        images: [
            "https://images.pexels.com/photos/1998439/pexels-photo-1998439.jpeg",
            "https://images.pexels.com/photos/319879/pexels-photo-319879.jpeg",
            "https://images.pexels.com/photos/6128957/pexels-photo-6128957.jpeg"
        ],
        itinerary: [
            {
                day: 1,
                title: "Arrival & Dambulla",
                activities: [
                    { title: "Airport Pickup", description: "Meet your guide at the airport and begin your journey to the Cultural Triangle." },
                    { title: "Dambulla Cave Temple", description: "Explore the Dambulla Cave Temple, a UNESCO site featuring five caves filled with statues and paintings of Lord Buddha." }
                ]
            },
            {
                day: 2,
                title: "Sigiriya",
                activities: [
                    { title: "Climb Sigiriya Rock Fortress", description: "Ascend the 1,200 steps to the top of Sigiriya Rock Fortress. Marvel at the ancient frescoes, the Mirror Wall, and the stunning ruins of the sky palace." },
                    { title: "Village Tour", description: "Experience authentic rural life with a village tour. Take a bullock cart ride, cross a lake by catamaran, and enjoy a traditional lunch prepared in a clay pot." }
                ]
            },
            {
                day: 3,
                title: "Polonnaruwa",
                activities: [
                    { title: "Ancient City Tour", description: "Visit the ruins of Polonnaruwa, the medieval capital. See the Gal Vihara rock carvings, the Royal Palace, and the Quadrangle." },
                    { title: "Minneriya Safari", description: "Go on a jeep safari in Minneriya National Park to witness the 'Gathering' of wild elephants." }
                ]
            },
            {
                day: 4,
                title: "Anuradhapura",
                activities: [
                    { title: "Sacred City Tour", description: "Explore Anuradhapura, the first capital of Sri Lanka. Visit the sacred Bo Tree, Ruwanwelisaya Stupa, and other ancient monuments." }
                ]
            },
            {
                day: 5,
                title: "Wilpattu",
                activities: [
                    { title: "Full Day Jeep Safari", description: "Embark on a full-day safari in Wilpattu National Park, known for its leopards and sloth bears." }
                ]
            },
            {
                day: 6,
                title: "Departure",
                activities: [
                    { title: "Transfer to Airport", description: "Conclude your heritage tour with a transfer to the airport." }
                ]
            }
        ],
        inclusions: ["Accommodation", "Breakfast", "Dinner", "Transport", "Guide", "Entrance Fees", "Safari Jeep"],
        exclusions: ["Flights", "Lunch", "Personal Expenses"],
        published: true
    },
    {
        title: "Yala Wildlife Safari",
        slug: "yala-wildlife-safari",
        description: "Encounter leopards, elephants, and bears in Yala National Park.",
        price: "450.00",
        durationDays: 3,
        category: "Wildlife & Nature",
        isFeatured: false,
        thumbnailUrl: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1000&auto=format&fit=crop"],
        itinerary: [{ day: 1, title: "Yala Safari", activities: [{ title: "Morning Safari", description: "Search for leopards." }] }],
        inclusions: ["Safari Jeep", "Entry Fees"],
        exclusions: [],
        published: true
    },
    {
        title: "Hidden Jaffna",
        slug: "hidden-jaffna",
        description: "Explore the northern peninsula and its unique culture.",
        price: "550.00",
        durationDays: 4,
        category: "Lesser Travelled",
        isFeatured: false,
        thumbnailUrl: "https://images.unsplash.com/photo-1588595280408-d42f769fb665?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1588595280408-d42f769fb665?q=80&w=1000&auto=format&fit=crop"],
        itinerary: [{ day: 1, title: "Jaffna Fort", activities: [{ title: "Fort Visit", description: "Walk around the Dutch Fort." }] }],
        inclusions: ["Guide"],
        exclusions: [],
        published: true
    },
    {
        title: "Flavors of Colombo",
        slug: "flavors-of-colombo",
        description: "A culinary journey through the streets of Colombo.",
        price: "150.00",
        durationDays: 1,
        category: "Gastronomy",
        type: "day_tour",
        isFeatured: false,
        thumbnailUrl: "https://images.unsplash.com/photo-1606471855660-845604164b96?q=80&w=1000&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1606471855660-845604164b96?q=80&w=1000&auto=format&fit=crop"],
        itinerary: [{ day: 1, title: "Street Food Tour", activities: [{ title: "Tasting", description: "Try Kottu and Hoppers." }] }],
        inclusions: ["Food Tasting"],
        exclusions: [],
        published: true
    },
    {
        title: "Galle Fort Day Excursion",
        slug: "galle-fort-day-excursion",
        description: "Explore the UNESCO World Heritage site of Galle Fort in a single day. Walk the ramparts, visit colonial buildings, and enjoy a seaside lunch.",
        price: "120.00",
        durationDays: 1,
        category: "Heritage",
        type: "day_tour",
        isFeatured: true,
        thumbnailUrl: "https://images.pexels.com/photos/16508252/pexels-photo-16508252.jpeg",
        images: ["https://images.pexels.com/photos/16508252/pexels-photo-16508252.jpeg"],
        itinerary: [{ day: 1, title: "Galle Fort", activities: [{ title: "Fort Walk", description: "Guided walking tour of the historic fort." }, { title: "Museum Visit", description: "Visit the Maritime Archeology Museum." }] }],
        inclusions: ["Transport", "Guide", "Lunch"],
        exclusions: ["Entry Fees"],
        published: true
    },
    {
        title: "Sigiriya Lion Rock Hike",
        slug: "sigiriya-lion-rock-hike",
        description: "A full day adventure to climb the 8th wonder of the world, Sigiriya Rock Fortress, followed by a village safari.",
        price: "180.00",
        durationDays: 1,
        category: "Adventure",
        type: "day_tour",
        isFeatured: true,
        thumbnailUrl: "https://images.pexels.com/photos/319879/pexels-photo-319879.jpeg",
        images: ["https://images.pexels.com/photos/319879/pexels-photo-319879.jpeg"],
        itinerary: [{ day: 1, title: "Sigiriya Climb", activities: [{ title: "Rock Climb", description: "Ascend the rock fortress." }, { title: "Village Tour", description: "Traditional village experience with lunch." }] }],
        inclusions: ["Transport", "Entry Fees", "Lunch"],
        exclusions: [],
        published: true
    }
];

const samplePosts = [
    {
        title: "10 Reasons Why Sri Lanka Should Be Your Next Destination",
        slug: "10-reasons-visit-sri-lanka",
        excerpt: "From golden beaches to misty mountains, discover the magic of the Pearl of the Indian Ocean.",
        content: `Sri Lanka is a land of endless wonders, where ancient ruins hide in dense jungles and leopards prowl in national parks. In this guide, we'll explore the diverse landscapes that make this island a photographer's paradise.

        1. The Beaches: From the surf breaks of Arugam Bay to the hidden coves of Tangalle, the coastline is nothing short of spectacular.
        2. The Hill Country: Take the iconic blue train through Ella's tea plantations for views that will leave you breathless.
        3. Wildlife: Witness the largest gathering of Asian elephants at Minneriya or spot the elusive leopard in Yala.`,
        coverImage: "https://images.pexels.com/photos/1000366/pexels-photo-1000366.jpeg",
        images: [
            "https://images.pexels.com/photos/33171756/pexels-photo-33171756.jpeg",
            "https://images.pexels.com/photos/32398184/pexels-photo-32398184.jpeg",
            "https://images.pexels.com/photos/30429205/pexels-photo-30429205.jpeg"
        ],
        author: "Sarah Jenkins",
        category: "Travel Guide",
        published: true
    },
    {
        title: "Chasing Waterfalls: The Ultimate Guide",
        slug: "chasing-waterfalls-guide",
        excerpt: "Explore the most breathtaking waterfalls hidden in the central highlands.",
        content: `The hill country of Sri Lanka is dotted with cascading waterfalls, some towering hundreds of meters high, others hidden deep within the verdant jungle.
        
        Bambarakanda Falls is the tallest, but Diyaluma offers natural pools you can swim in at the very top. Hiking to these spots provides not just a refreshing dip but also some of the most scenic trekking routes in the country.`,
        coverImage: "https://images.pexels.com/photos/3354347/pexels-photo-3354347.jpeg",
        images: [
            "https://images.pexels.com/photos/31572677/pexels-photo-31572677.jpeg",
            "https://images.pexels.com/photos/35456333/pexels-photo-35456333.jpeg",
            "https://images.pexels.com/photos/34218645/pexels-photo-34218645.jpeg"
        ],
        author: "David Ross",
        category: "Adventure",
        published: true
    },
    {
        title: "A Culinary Journey Through Colombo",
        slug: "culinary-journey-colombo",
        excerpt: "Taste the spicy, sweet, and savory flavors of Sri Lankan street food.",
        content: "Colombo offers a vibrant food scene...",
        coverImage: "https://images.unsplash.com/photo-1606471855660-845604164b96?q=80&w=1000&auto=format&fit=crop",
        images: [
            "https://images.pexels.com/photos/20712001/pexels-photo-20712001.jpeg",
            "https://images.pexels.com/photos/29813527/pexels-photo-29813527.jpeg"
        ],
        author: "Maya Perera",
        category: "Food & Drink",
        published: true
    },
    {
        title: "Surfing the South Coast",
        slug: "surfing-south-coast",
        excerpt: "Find the best breaks for beginners and pros along the southern shoreline.",
        content: "Arugam Bay and Mirissa depend on the season...",
        coverImage: "https://images.pexels.com/photos/16508233/pexels-photo-16508233.jpeg",
        images: [
            "https://images.pexels.com/photos/33171756/pexels-photo-33171756.jpeg",
            "https://images.pexels.com/photos/16508252/pexels-photo-16508252.jpeg"
        ],
        author: "Jack Thompson",
        category: "Adventure",
        published: true
    },
    {
        title: "Wildlife Safari: Yala vs Wilpattu",
        slug: "yala-vs-wilpattu",
        excerpt: "Which national park offers the best safari experience? We compare the giants.",
        content: "If you want leopards, Yala is famous...",
        coverImage: "https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1000&auto=format&fit=crop",
        images: [
            "https://images.pexels.com/photos/32326686/pexels-photo-32326686.jpeg",
            "https://images.pexels.com/photos/32398215/pexels-photo-32398215.jpeg"
        ],
        author: "Sarah Jenkins",
        category: "Wildlife",
        published: true
    },
    {
        title: "The Ancient City of Polonnaruwa",
        slug: "ancient-city-polonnaruwa",
        excerpt: "Walk among the ruins of kings and explore the rich history of the medieval capital.",
        content: "Polonnaruwa remains exist as a testament...",
        coverImage: "https://images.pexels.com/photos/6128957/pexels-photo-6128957.jpeg",
        images: [
            "https://images.pexels.com/photos/5405597/pexels-photo-5405597.jpeg",
            "https://images.pexels.com/photos/31001501/pexels-photo-31001501.jpeg"
        ],
        author: "Dr. A. Silva",
        category: "History",
        published: true
    }
];

async function seed() {
    console.log('Seeding packages and posts...');
    const { db } = await import('./index');
    const { bookings, packages, posts, teamMembers, partners } = await import('./schema');
    try {
        // Clear existing data
        await db.delete(packages);
        await db.delete(posts);
        console.log('Cleared existing data');

        for (const pkg of samplePackages) {
            await db.insert(packages).values(pkg).onConflictDoNothing();
        }

        for (const post of samplePosts) {
            await db.insert(posts).values(post).onConflictDoNothing();
        }

        // Seed Team Members
        const sampleTeam = [
            {
                name: "Sanul Rimsan",
                role: "Founder & CEO",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
                bio: "Passionate about showing the world the beauty of Sri Lanka.",
                order: 1,
                active: true
            },
            {
                name: "Sarah Jenkins",
                role: "Head of Content",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                bio: "Travel writer and photographer with a love for hidden gems.",
                order: 2,
                active: true
            },
            {
                name: "David Ross",
                role: "Lead Guide",
                image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
                bio: "Expert naturalist with 15 years of experience in wildlife tracking.",
                order: 3,
                active: true
            }
        ];

        await db.insert(teamMembers).values(sampleTeam);
        console.log('Seeded team members');

        // Seed Partners
        const samplePartners = [
            {
                name: "National Geographic",
                logo: "https://upload.wikimedia.org/wikipedia/commons/6/67/National_Geographic_Logo.svg",
                website: "https://www.nationalgeographic.com",
                order: 1,
                active: true
            },
            {
                name: "Lonely Planet",
                logo: "https://upload.wikimedia.org/wikipedia/commons/9/98/Lonely_Planet_logo.svg",
                website: "https://www.lonelyplanet.com",
                order: 2,
                active: true
            },
            {
                name: "TripAdvisor",
                logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/TripAdvisor_Logo.svg",
                website: "https://www.tripadvisor.com",
                order: 3,
                active: true
            },
            {
                name: "Airbnb",
                logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
                website: "https://www.airbnb.com",
                order: 4,
                active: true
            }
        ];

        await db.insert(partners).values(samplePartners);
        console.log('Seeded partners');

        console.log('Seeding completed!');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        process.exit(0);
    }
}

seed();
