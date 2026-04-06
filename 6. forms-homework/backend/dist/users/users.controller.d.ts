import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(search?: string): Promise<User[]>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UserDto): Promise<User>;
}
