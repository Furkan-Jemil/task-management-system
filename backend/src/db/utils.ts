import { pgTable as pgTableFn, uuid as pgUuid, varchar as pgVarchar, text as pgText, timestamp as pgTimestamp } from 'drizzle-orm/pg-core';
import { sqliteTable as sqliteTableFn, text as sqliteText, integer as sqliteInteger } from 'drizzle-orm/sqlite-core';
import * as dotenv from 'dotenv';

dotenv.config();

const useLocalDb = process.env.USE_LOCAL_DB === 'true';

export const table: any = (name: string, columns: any) => {
    if (useLocalDb) {
        return sqliteTableFn(name, columns);
    }
    return pgTableFn(name, columns);
};

export const id: any = (name: string) => {
    if (useLocalDb) {
        return sqliteText(name).primaryKey();
    }
    return pgUuid(name).primaryKey().defaultRandom();
};

export const varchar: any = (name: string, options: { length: number }) => {
    if (useLocalDb) {
        return sqliteText(name);
    }
    return pgVarchar(name, options);
};

export const text: any = (name: string) => {
    if (useLocalDb) {
        return sqliteText(name);
    }
    return pgText(name);
};

export const timestamp: any = (name: string) => {
    if (useLocalDb) {
        return sqliteInteger(name, { mode: 'timestamp' });
    }
    return pgTimestamp(name);
};

export const createdAt: any = (name: string = 'created_at') => {
    if (useLocalDb) {
        return sqliteInteger(name, { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull();
    }
    return pgTimestamp(name).defaultNow().notNull();
};

export const updatedAt: any = (name: string = 'updated_at') => {
    if (useLocalDb) {
        return sqliteInteger(name, { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull();
    }
    return pgTimestamp(name).defaultNow().notNull();
};

export const foreignId: any = (name: string, references: () => any) => {
    if (useLocalDb) {
        return sqliteText(name).notNull().references(references, { onDelete: 'cascade' });
    }
    return pgUuid(name).notNull().references(references, { onDelete: 'cascade' });
};
