import { integer, pgTable, varchar, text, jsonb, boolean, timestamp, pgEnum, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const roleEnum = pgEnum("role", ["admin", "editor"]);
export const inquiryStatusEnum = pgEnum("inquiry_status", ["pending", "reviewed", "contacted", "booked", "archived"]);
export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "cancelled", "completed"]);

// Auth Tables (Better-Auth)
export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    role: text("role").default("admin"), // Added role field
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId").notNull().references(() => user.id),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull()
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId").notNull().references(() => user.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull()
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp('createdAt'),
    updatedAt: timestamp('updatedAt')
});

// Tour Packages
export const packages = pgTable("packages", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    durationDays: integer("duration_days").notNull(),
    category: varchar("category", { length: 50 }),
    type: varchar("type", { length: 20 }).default("package"), // 'package' or 'day_tour'
    isFeatured: boolean("is_featured").default(false),
    thumbnailUrl: text("thumbnail_url"),
    images: jsonb("images").$type<string[]>(), // Array of image URLs
    itinerary: jsonb("itinerary").$type<{ day: number; title: string; description?: string; image?: string; activities: { title: string; description: string }[] }[]>(),
    inclusions: jsonb("inclusions").$type<string[]>(),
    exclusions: jsonb("exclusions").$type<string[]>(),
    published: boolean("published").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Custom Trip Inquiries
export const inquiries = pgTable("inquiries", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    customerEmail: varchar("customer_email", { length: 255 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 50 }), // Variable length for intl numbers
    nationality: varchar("nationality", { length: 100 }),

    // Trip Details
    destinations: jsonb("destinations").$type<string[]>(),
    interests: jsonb("interests").$type<string[]>(),
    budgetRange: varchar("budget_range", { length: 100 }),
    arrivalDate: timestamp("arrival_date"),
    numberOfAdults: integer("number_of_adults").default(1),
    numberOfChildren: integer("number_of_children").default(0),
    message: text("message"),

    status: inquiryStatusEnum("status").default("pending"),
    adminNotes: text("admin_notes"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Bookings (Direct package bookings)
export const bookings = pgTable("bookings", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    packageId: integer("package_id").references(() => packages.id),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    customerEmail: varchar("customer_email", { length: 255 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 50 }),
    travelDate: timestamp("travel_date").notNull(),
    numberOfPeople: integer("number_of_people").notNull(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
    status: bookingStatusEnum("status").default("pending"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog Posts
export const posts = pgTable("posts", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    excerpt: text("excerpt"),
    content: text("content"),
    coverImage: text("cover_image"),
    images: jsonb("images").$type<string[]>(),
    author: varchar("author", { length: 100 }),
    category: varchar("category", { length: 50 }),
    published: boolean("published").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const bookingsRelations = relations(bookings, ({ one }) => ({
    package: one(packages, {
        fields: [bookings.packageId],
        references: [packages.id],
    }),
}));

export const packagesRelations = relations(packages, ({ many }) => ({
}));

export const teamMembers = pgTable("team_members", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 100 }).notNull(),
    role: varchar("role", { length: 100 }).notNull(),
    image: text("image"),
    bio: text("bio"),
    order: integer("order").default(0),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const partners = pgTable("partners", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 100 }).notNull(),
    logo: text("logo"),
    website: text("website"),
    order: integer("order").default(0),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const categories = pgTable("categories", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description"),
    image: text("image"),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    companyName: varchar("company_name", { length: 255 }).default('Travel Temp'),
    email: varchar("email", { length: 255 }),
    phone: varchar("phone", { length: 50 }),
    hotline: varchar("hotline", { length: 50 }),
    whatsapp: varchar("whatsapp", { length: 50 }),
    address: text("address"),
    facebook: varchar("facebook", { length: 255 }),
    instagram: varchar("instagram", { length: 255 }),
    youtube: varchar("youtube", { length: 255 }),
    showPrice: boolean("show_price").default(true),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    subject: varchar("subject", { length: 255 }).notNull(),
    message: text("message").notNull(),
    status: varchar("status", { length: 50 }).default('new'), // new, read, replied
    createdAt: timestamp("created_at").defaultNow(),
});


export const gallery = pgTable("gallery", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    image: text("image").notNull(),
    location: varchar("location", { length: 255 }),
    order: integer("order").default(0),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const plannerOptions = pgTable("planner_options", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    category: varchar("category", { length: 50 }).notNull(), // 'region', 'style', 'accommodation', 'experience'
    label: varchar("label", { length: 255 }).notNull(),
    description: text("description"),
    image: text("image"), // Optional image/icon
    metadata: jsonb("metadata"), // flexible for things like star rating
    order: integer("order").default(0),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const blogCategories = pgTable("blog_categories", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description"),
    image: text("image"),
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

export const destinations = pgTable("destinations", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"), // Rich text
    shortDescription: text("short_description"), // For cards
    image: text("image"), // Cover image
    gallery: jsonb("gallery").$type<string[]>(), // Array of image URLs
    active: boolean("active").default(true),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});