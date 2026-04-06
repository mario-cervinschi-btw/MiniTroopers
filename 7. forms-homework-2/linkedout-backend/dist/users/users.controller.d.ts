import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserDto } from './dto/user.dto';
import { PaginatedResponse } from '../common/pagination';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(search?: string, sort?: string, order?: 'asc' | 'desc', page?: number, limit?: number): Promise<PaginatedResponse<User>>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UserDto): Promise<User>;
}
