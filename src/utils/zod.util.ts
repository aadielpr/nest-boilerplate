import { z } from "zod";
import { isUnix } from "../utils";
import { isHexString } from "./validation.util";

export const UnixSchemaZ = z
    .number()
    .positive()
    .refine((v) => isUnix(v), { message: "Invalid unix timestamp." });

export const NumericStringSchemaZ = z.coerce.number().transform((val) => String(val));

export const HexStringSchemaZ = z
    .string()
    .refine((val) => isHexString(val), { message: "Invalid Hex String." });
