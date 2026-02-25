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
exports.CreateWatchHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateWatchHistoryDto {
    user_id;
    movie_id;
    watchedDuration;
    watchedPercentage;
    lastWatched;
}
exports.CreateWatchHistoryDto = CreateWatchHistoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'c79f7c23-c8b4-465a-8fba-06ccc10ee18a',
        description: 'User ID (UUID)',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateWatchHistoryDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'a12f7c23-c8b4-465a-8fba-06ccc10ee1111',
        description: 'Movie ID (UUID)',
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateWatchHistoryDto.prototype, "movie_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1200,
        description: 'Korilgan vaqt (sekundlarda)',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWatchHistoryDto.prototype, "watchedDuration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 75.5,
        description: 'Korilgan foiz (0 dan 100 gacha)',
        type: Number,
        format: 'float',
    }),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], CreateWatchHistoryDto.prototype, "watchedPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-02-25T15:30:00.000Z',
        description: 'Oxirgi korilgan vaqt',
        required: false,
    }),
    __metadata("design:type", Date)
], CreateWatchHistoryDto.prototype, "lastWatched", void 0);
//# sourceMappingURL=create-watchhistory.dto.js.map