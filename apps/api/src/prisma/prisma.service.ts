import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import env from '../utils/env';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    this.$connect().then(() => {
      Logger.log("Database Connected successfully", "MongoDBConnection")
    })
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
