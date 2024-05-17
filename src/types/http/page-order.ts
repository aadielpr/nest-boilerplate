import { z } from "zod";
import { PageOrder } from "../../constants";

export const PageOrderSchemaZ = z.union([z.literal(PageOrder.ASC), z.literal(PageOrder.DESC)]);

export type TPageOrder = z.infer<typeof PageOrderSchemaZ>;
