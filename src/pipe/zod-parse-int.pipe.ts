import { ArgumentMetadata, Injectable } from "@nestjs/common";
import { ZodValidationPipe as AnatineZodValidationPipe } from "@anatine/zod-nestjs";
import { z } from "zod";
import { BadRequestException } from "../exceptions";

@Injectable()
export class ZodParseIntPipe extends AnatineZodValidationPipe {
    override transform(value: unknown, metadata: ArgumentMetadata): unknown {
        const parseResult = z.coerce.number().int().safeParse(value);

        if (!parseResult.success) {
            throw new BadRequestException({
                [metadata.data || ""]: ["Invalid format."],
            });
        }

        return parseResult.data;
    }
}
