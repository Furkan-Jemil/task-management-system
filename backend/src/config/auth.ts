import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";
import * as dotenv from 'dotenv';

dotenv.config();

const useLocalDb = process.env.USE_LOCAL_DB === 'true';

export const auth = betterAuth({
    baseURL: process.env.BETTERAUTH_URL || "http://localhost:5000",
    database: drizzleAdapter(db, {
        provider: useLocalDb ? "sqlite" : "pg",
        schema: {
            user: schema.users,
            session: schema.session,
            account: schema.account,
            verification: schema.verification,
        }
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
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
