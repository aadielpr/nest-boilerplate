import { InferSelectModel } from "drizzle-orm";
import { bigserial, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { utcNow } from "utils";
import { DrizzleTable } from "../drizzle.constant";

export const users = pgTable(DrizzleTable.USER, {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    name: varchar("name"),
    c_at: timestamp("c_at").notNull().default(utcNow()),
    u_at: timestamp("u_at").notNull().default(utcNow()),
    d_at: timestamp("d_at"),
});

export type User = InferSelectModel<typeof users>;
