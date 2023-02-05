import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

type ViewsTable = {
    slug: string;
    count: number;
};

type Database = {
    views: ViewsTable;
};

export const queryBuilder = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        url: process.env.DATABASE_URL
    })
});
