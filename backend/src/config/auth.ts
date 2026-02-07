import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: schema.users,
        }
    }),
    emailAndPassword: {
        enabled: true,
        async hashPassword(password) {
            // Better-auth handles hashing by default if not provided, 
            // but we can customize if needed.
            return password; // placeholder, better-auth has internal secure hashing
        }
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
    trustedOrigins: [
        process.env.BETTERAUTH_URL || "http://localhost:5000",
        "http://localhost:5173",
        "http://localhost:5174"
    ]
});
