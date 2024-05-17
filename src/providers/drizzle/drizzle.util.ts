import { asc, desc } from "drizzle-orm";
import { PgSelect } from "drizzle-orm/pg-core";
import { PageOptionsDto, TPageOrder } from "types";

export function withPage<T extends PgSelect>(q: T, pageOptions: PageOptionsDto): T {
    if (!pageOptions.takeAll) {
        return q.limit(pageOptions.limit).offset(pageOptions.skip);
    }

    return q;
}

export function withOrderBy<T extends PgSelect>(
    q: T,
    order: TPageOrder,
    field: keyof T["_"]["selectedFields"],
) {
    return q.orderBy((params) => (order === "asc" ? asc(params[field]) : desc(params[field])));
}
