"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMovieDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class CreateMovieDto {
    title;
    slug;
    description;
    releaseYear;
    durationMinutes;
    rating;
    subscriptionType;
    category_slug;
    quality;
    language;
}
exports.CreateMovieDto = CreateMovieDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'The Matrix',
        description: 'Film nomi',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'the-matrix',
        description: 'Film slug (URL-friendly nomi)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Hacks Tutorial',
        description: 'Film tavsifi',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1999,
        description: 'Chiqarilgan yil',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1800),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateMovieDto.prototype, "releaseYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 136,
        description: 'Film davomiyligi (minutlarda)',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateMovieDto.prototype, "durationMinutes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 8,
        description: 'Reyting (1 dan 10 gacha)',
        minimum: 1,
        maximum: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], CreateMovieDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'free',
        enum: client_1.SubscriptionType,
    }),
    (0, class_validator_1.IsEnum)(client_1.SubscriptionType),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "subscriptionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'action-movies' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "category_slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "quality", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovieDto.prototype, "language", void 0);
//# sourceMappingURL=create-movie.dto.js.map