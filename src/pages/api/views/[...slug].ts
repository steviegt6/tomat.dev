import env from "lib/env";
import { queryBuilder } from "lib/planetscale";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const slug = req.query.slug!.toString();
        let data = await queryBuilder.selectFrom("views").where("slug", "=", slug).select(["count"]).execute();

        console.log(data);

        if (!data.length) data = [{ count: 0 }];

        const views = Number(data[0].count);

        console.log(views);

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
        console.log(e);
        return res.status(500).json({ error: e.message });
    }
}
