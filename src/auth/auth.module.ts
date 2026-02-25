import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [ConfigModule, JwtModule.registerAsync({
    global: true,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: () => ({
      secret: process.env.JWT_SECRET || "shaftoli",
      signOptions: { expiresIn: "7d" },
    }),
  })],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
