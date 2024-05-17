import { createZodDto } from "@anatine/zod-nestjs";
import { z } from "zod";
import { PageOrder } from "../../constants";
import { utcNow } from "../../utils";
import { PageOrderSchemaZ } from "./page-order";

export const PageOptionsSchemaZ = z.object({
    limit: z.coerce.number().gt(0).lte(1000).default(10),
    skip: z.coerce.number().gte(0).default(0),
    order: PageOrderSchemaZ.default(PageOrder.DESC),
    takeAll: z.coerce
        .boolean()
        .catch(() => false)
        .default(false),
    startDate: z.coerce
        .date()
        .catch(() => utcNow())
        .default(utcNow()),
    endDate: z.coerce
        .date()
        .catch(() => utcNow())
        .default(utcNow()),
});

export class PageOptionsDto extends createZodDto(PageOptionsSchemaZ) {}
