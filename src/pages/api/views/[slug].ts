import { queryBuilder } from "lib/planetscale";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.query.slug) throw new Error("No slug provided");

        const slug = req.query.slug.toString();
        const data = await queryBuilder.selectFrom("views").where("slug", "=", slug).select(["count"]).execute();

        if (!data.length) return 0;

        const views = Number(data[0].count);

        if (req.method === "POST") {
            await queryBuilder
                .insertInto("views")
                .values({ slug, count: 1 })
                .onDuplicateKeyUpdate({ count: views + 1 })
                .execute();

            return res.status(200).json({
                total: views + 1
            });
        }

        if (req.method === "GET") {
            return res.status(200).json({
                total: views
            });
        }
    } catch (e: any) {
        return res.status(500).json({ error: e.message });
    }
}
