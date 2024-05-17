import { z } from "zod";

export const HttpAccessTokenSchemaZ = z.object({
    access: z.string().nullable(),
    refresh: z.string().optional(),
});

export type THttpAccessToken = z.infer<typeof HttpAccessTokenSchemaZ>;
