import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";
import env from "./env";

type ViewsTable = {
    slug: string;
    count: number;
};

type Database = {
    views: ViewsTable;
};

export const queryBuilder = new Kysely<Database>({
    dialect: new PlanetScaleDialect({
        url: env.DATABASE_URL
    })
});
