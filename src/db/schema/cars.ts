import { integer, pgTable, varchar, uuid, numeric, timestamp } from "drizzle-orm/pg-core";

export const cars = pgTable("cars", {
    id: uuid("id").defaultRandom().primaryKey(),
    brand: varchar("brand", { length: 80 }).notNull(), // length é o limite de caracteres
    model: varchar("model", { length: 120 }).notNull(), // notNull() obriga a ter um valor, não pode ser nulo
    version: varchar("version", { length: 120 }),
    year: integer("year").notNull(),
    price: numeric("price", { precision: 12, scale: 2 }).notNull(), // precision é o número total de dígitos, scale tem 2 casas decimais (os centavos)
    fuel: varchar("fuel", { length: 30 }),
    transmission: varchar("transmission", { length: 30 }),
    mileage: integer("mileage"),
    imageUrl: varchar("image_url", { length: 2048 }),
    createdAt: timestamp("created_at", { withTimezone: true })
        .defaultNow() // registra exatamente a hora que o carro foi cadastrado
        .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .defaultNow()
        .notNull(),
});
