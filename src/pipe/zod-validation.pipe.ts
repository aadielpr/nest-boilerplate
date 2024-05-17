import { ArgumentMetadata, Injectable } from "@nestjs/common";
import { ZodValidationPipe as AnatineZodValidationPipe, ZodDtoStatic } from "@anatine/zod-nestjs";
import { BadRequestException } from "../exceptions";

@Injectable()
export class ZodValidationPipe extends AnatineZodValidationPipe {
    override transform(value: unknown, metadata: ArgumentMetadata): unknown {
        const zodSchema = (metadata?.metatype as ZodDtoStatic)?.zodSchema;

        if (zodSchema) {
            const parseResult = zodSchema.safeParse(value);

            if (!parseResult.success) {
                const error = parseResult.error;
                throw new BadRequestException(error.flatten().fieldErrors);
            }

            return parseResult.data;
        }

        return value;
    }
}
