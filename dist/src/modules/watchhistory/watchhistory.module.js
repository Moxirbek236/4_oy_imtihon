"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchhistoryModule = void 0;
const common_1 = require("@nestjs/common");
const watchhistory_service_1 = require("./watchhistory.service");
const watchhistory_controller_1 = require("./watchhistory.controller");
let WatchhistoryModule = class WatchhistoryModule {
};
exports.WatchhistoryModule = WatchhistoryModule;
exports.WatchhistoryModule = WatchhistoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [watchhistory_controller_1.WatchhistoryController],
        providers: [watchhistory_service_1.WatchhistoryService],
    })
], WatchhistoryModule);
//# sourceMappingURL=watchhistory.module.js.map