import { Inject, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DRIZZLE_CLIENT } from "providers/drizzle";

@Injectable()
export class UserRepository {
    constructor(@Inject(DRIZZLE_CLIENT) private readonly db: NodePgDatabase) {}
}
