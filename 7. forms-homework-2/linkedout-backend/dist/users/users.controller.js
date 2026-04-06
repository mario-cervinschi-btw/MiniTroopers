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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const users_entity_1 = require("./users.entity");
const user_dto_1 = require("./dto/user.dto");
const pagination_1 = require("../common/pagination");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async findAll(search, sort, order, page = 1, limit = 10) {
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const [users, total] = await this.usersService.findAll(search, sort, order, pageNum, limitNum);
        return (0, pagination_1.paginate)(users, total, pageNum, limitNum);
    }
    async findOne(id) {
        return this.usersService.findOne(id);
    }
    async update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        required: false,
        description: 'Filter users by name (case-insensitive contains)',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sort',
        required: false,
        description: 'Field to sort by',
        type: String,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'order',
        required: false,
        description: 'Sort direction: asc or desc',
        enum: ['asc', 'desc'],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        description: 'Page number (1-based)',
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        description: 'Number of results per page',
        type: Number,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Users retrieved successfully.',
        type: users_entity_1.User,
        isArray: true,
    }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('sort')),
    __param(2, (0, common_1.Query)('order')),
    __param(3, (0, common_1.Query)('page')),
    __param(4, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a user by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'User id' }),
    (0, swagger_1.ApiOkResponse)({ description: 'User retrieved successfully', type: users_entity_1.User }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user by id' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'User id' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UserDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'User updated successfully', type: users_entity_1.User }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'User not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map