import env from "lib/env";
import { queryBuilder } from "lib/planetscale";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    if (!env.DATABASE_URL) return res.status(200).json([]);
    try {
        const data = await queryBuilder.selectFrom("views").select(["slug", "count"]).execute();

        return res.status(200).json(data);
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}
