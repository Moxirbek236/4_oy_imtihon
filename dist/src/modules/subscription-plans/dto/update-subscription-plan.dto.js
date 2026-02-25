"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubscriptionPlanDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_subscription_plan_dto_1 = require("./create-subscription-plan.dto");
class UpdateSubscriptionPlanDto extends (0, mapped_types_1.PartialType)(create_subscription_plan_dto_1.CreateSubscriptionPlanDto) {
}
exports.UpdateSubscriptionPlanDto = UpdateSubscriptionPlanDto;
//# sourceMappingURL=update-subscription-plan.dto.js.map