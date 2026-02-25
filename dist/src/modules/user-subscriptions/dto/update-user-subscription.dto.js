"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSubscriptionDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_subscription_dto_1 = require("./create-user-subscription.dto");
class UpdateUserSubscriptionDto extends (0, mapped_types_1.PartialType)(create_user_subscription_dto_1.CreateUserSubscriptionDto) {
}
exports.UpdateUserSubscriptionDto = UpdateUserSubscriptionDto;
//# sourceMappingURL=update-user-subscription.dto.js.map