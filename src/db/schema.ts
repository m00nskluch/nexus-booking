import { pgTable, text, varchar, integer, timestamp, pgEnum, uuid } from "drizzle-orm/pg-core";

export const bookingStatusEnum = pgEnum("booking_status", ["pending", "confirmed", "cancelled"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(), // Clerk ID
  email: text("email").notNull().unique(),
  name: text("name"),
  avatar: text("avatar"),
});

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: integer("price").notNull(), // in cents
  duration: text("duration"), // e.g. "1 hour"
});

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: varchar("user_id", { length: 255 }).references(() => users.id).notNull(),
  serviceId: uuid("service_id").references(() => services.id).notNull(),
  bookingDate: timestamp("booking_date").notNull(),
  status: bookingStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
