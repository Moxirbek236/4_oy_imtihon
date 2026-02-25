import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const connectionString = process.env.DATABASE_URL;

    const pool = new Pool({
      connectionString,
    });

    const adapter = new PrismaPg(pool)

    super({
      adapter: adapter,
      log: ['warn', 'error'],
      errorFormat: 'pretty',
    })
  }

  async onModuleInit() {
    Logger.log("✅ Prisma connected successfully");
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
