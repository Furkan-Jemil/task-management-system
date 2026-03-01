import { pgTable as pgTableFn, uuid as pgUuid, varchar as pgVarchar, text as pgText, timestamp as pgTimestamp, integer as pgInteger } from 'drizzle-orm/pg-core';
import { sqliteTable as sqliteTableFn, text as sqliteText, integer as sqliteInteger } from 'drizzle-orm/sqlite-core';
import * as dotenv from 'dotenv';

dotenv.config();

const useLocalDb = process.env.USE_LOCAL_DB === 'true';

export const table: any = useLocalDb ? sqliteTableFn : pgTableFn;

export const id = (name: string) => {
    if (useLocalDb) {
        return sqliteText(name).primaryKey();
    }
    return pgUuid(name).primaryKey().defaultRandom();
};

export const varchar = (name: string, options: { length: number }) => {
    if (useLocalDb) {
        return sqliteText(name);
    }
    return pgVarchar(name, options);
};

export const text = (name: string) => {
    if (useLocalDb) {
        return sqliteText(name);
    }
    return pgText(name);
};

export const timestamp = (name: string) => {
    if (useLocalDb) {
        return sqliteInteger(name, { mode: 'timestamp' });
    }
    return pgTimestamp(name);
};

export const createdAt = (name: string = 'created_at') => {
    if (useLocalDb) {
        return sqliteInteger(name, { mode: 'timestamp' }).defaultNow().notNull();
    }
    return pgTimestamp(name).defaultNow().notNull();
};

export const updatedAt = (name: string = 'updated_at') => {
    if (useLocalDb) {
        return sqliteInteger(name, { mode: 'timestamp' }).defaultNow().notNull();
    }
    return pgTimestamp(name).defaultNow().notNull();
};

export const foreignId = (name: string, references: () => any) => {
    if (useLocalDb) {
        return sqliteText(name).notNull().references(references, { onDelete: 'cascade' });
    }
    return pgUuid(name).notNull().references(references, { onDelete: 'cascade' });
};
